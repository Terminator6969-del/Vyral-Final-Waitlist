'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, Upload, Film } from 'lucide-react'
import { useJobStatus } from '@/hooks/use-job-status'
import FlowBResult from './flow-b-result'
import StatusCard from '../status-card'

export default function UploadVideo() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [platforms, setPlatforms] = useState<string[]>(['tiktok'])
  const [scheduleType, setScheduleType] = useState<'now' | 'schedule'>('now')
  const [scheduleTime, setScheduleTime] = useState('')
  const [generateClips, setGenerateClips] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const { status, isLoading, error: jobError } = useJobStatus(jobId)

  const handleFileSelect = (selected: File) => {
    if (selected.type.startsWith('video/')) {
      setFile(selected)
      setErrors([])
    } else {
      setErrors(['Please select a valid video file'])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) handleFileSelect(droppedFile)
  }

  const uploadVideoToStorage = async (videoFile: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', videoFile)

    const response = await fetch('/api/upload-file', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload video')
    }

    const data = await response.json()
    return data.file_url
  }

  const handleUpload = async () => {
    const validationErrors: string[] = []

    if (!file) validationErrors.push('Please select a video file')
    if (platforms.length === 0) validationErrors.push('Please select at least one platform')
    if (scheduleType === 'schedule' && !scheduleTime) {
      validationErrors.push('Please select a schedule time')
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setIsUploading(true)
      setErrors([])

      const fileUrl = await uploadVideoToStorage(file!)

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file_url: fileUrl,
          platforms,
          schedule_time: scheduleType === 'schedule' ? scheduleTime : null,
          generate_clips: generateClips,
        }),
      })

      if (!response.ok) throw new Error('Failed to start upload job')

      const data = await response.json()
      setJobId(data.job_id)
    } catch (err) {
      setErrors([err instanceof Error ? err.message : 'Upload failed'])
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6 border-cyan-500/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
          <Film className="w-5 h-5 text-cyan-400" />
          Upload & Post Video
        </h3>

        <div className="space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Video File
            </label>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/50 transition-all bg-slate-900/30"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/mov"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              {file ? (
                <div className="flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300">{file.name}</span>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-300">Drag and drop your video or click to select</p>
                  <p className="text-xs text-slate-500 mt-1">MP4, WebM, or MOV up to 500MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Select Platforms
            </label>
            <div className="space-y-2">
              {['tiktok', 'instagram', 'youtube'].map((platform) => (
                <label key={platform} className="flex items-center gap-3 cursor-pointer hover:bg-slate-900/30 p-2 rounded transition-colors">
                  <input
                    type="checkbox"
                    checked={platforms.includes(platform)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPlatforms([...platforms, platform])
                      } else {
                        setPlatforms(platforms.filter((p) => p !== platform))
                      }
                    }}
                    disabled={isUploading}
                    className="w-4 h-4 accent-cyan-400"
                  />
                  <span className="text-slate-300 capitalize text-sm">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Post Timing
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-900/30 p-2 rounded transition-colors">
                <input
                  type="radio"
                  checked={scheduleType === 'now'}
                  onChange={() => setScheduleType('now')}
                  disabled={isUploading}
                  className="w-4 h-4 accent-cyan-400"
                />
                <span className="text-slate-300 text-sm">Post now</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-900/30 p-2 rounded transition-colors">
                <input
                  type="radio"
                  checked={scheduleType === 'schedule'}
                  onChange={() => setScheduleType('schedule')}
                  disabled={isUploading}
                  className="w-4 h-4 accent-cyan-400"
                />
                <span className="text-slate-300 text-sm">Schedule</span>
              </label>
            </div>
            {scheduleType === 'schedule' && (
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                disabled={isUploading}
                className="mt-3 w-full px-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
            )}
          </div>

          {/* Options */}
          <div className="flex items-center gap-3 hover:bg-slate-900/30 p-2 rounded transition-colors">
            <input
              type="checkbox"
              id="clips"
              checked={generateClips}
              onChange={(e) => setGenerateClips(e.target.checked)}
              disabled={isUploading}
              className="w-4 h-4 accent-cyan-400"
            />
            <label htmlFor="clips" className="text-slate-300 cursor-pointer text-sm">
              Generate micro-clips
            </label>
          </div>

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              {errors.map((error, i) => (
                <p key={i} className="text-red-400 text-sm">{error}</p>
              ))}
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={isUploading || !file || platforms.length === 0}
            className="w-full bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-400 border border-cyan-500/40 rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Generate & Schedule'
            )}
          </Button>
        </div>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        {jobError && (
          <Card className="glass-card p-4 border-red-500/30 bg-red-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{jobError}</p>
            </div>
          </Card>
        )}

        {!status && !jobId && (
          <Card className="glass-card p-8 text-center border-cyan-500/10">
            <p className="text-slate-400">Upload a video to generate captions and schedule posting.</p>
          </Card>
        )}

        {jobId && status && (
          <>
            <StatusCard status={status.status} isLoading={isLoading} />
            {status.status === 'done' && status.type === 'flow_b' && (
              <FlowBResult output={status.output_payload} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
