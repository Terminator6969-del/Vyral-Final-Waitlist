'use client'

import { Card } from '@/components/ui/card'
import { useState } from 'react'
import CopyButton from '../copy-button'
import { BarChart3 } from 'lucide-react'

interface FlowBOutput {
  final_video_url?: string
  transcript?: string
  platform_captions?: {
    tiktok?: string
    instagram?: string
    youtube?: string
  }
  micro_clips?: Array<{ label: string; url: string }>
  posting_status?: {
    tiktok?: 'queued' | 'scheduled' | 'posted' | 'failed'
    instagram?: 'queued' | 'scheduled' | 'posted' | 'failed'
    youtube?: 'queued' | 'scheduled' | 'posted' | 'failed'
  }
}

const statusColors: Record<string, string> = {
  queued: 'bg-slate-500/20 text-slate-400',
  scheduled: 'bg-blue-500/20 text-blue-400',
  posted: 'bg-green-500/20 text-green-400',
  failed: 'bg-red-500/20 text-red-400',
}

export default function FlowBResult({ output }: { output: FlowBOutput }) {
  const [transcriptOpen, setTranscriptOpen] = useState(false)

  if (!output) return null

  return (
    <div className="space-y-6">
      {/* Video Preview */}
      {output.final_video_url && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Final Video</h3>
          <video
            src={output.final_video_url}
            controls
            className="w-full rounded-lg bg-slate-800"
          />
        </Card>
      )}

      {/* Transcript */}
      {output.transcript && (
        <Card className="glass-card p-6">
          <button
            onClick={() => setTranscriptOpen(!transcriptOpen)}
            className="w-full flex items-center justify-between mb-2"
          >
            <h3 className="text-lg font-semibold text-slate-50">Transcript</h3>
            <span className="text-slate-400">{transcriptOpen ? '−' : '+'}</span>
          </button>
          {transcriptOpen && (
            <p className="text-slate-300 text-sm leading-relaxed">{output.transcript}</p>
          )}
        </Card>
      )}

      {/* Platform Captions */}
      {output.platform_captions && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Platform Captions</h3>
          <div className="space-y-4">
            {Object.entries(output.platform_captions).map(([platform, caption]) => {
              if (!caption) return null
              return (
                <div key={platform}>
                  <p className="text-sm text-slate-400 capitalize mb-2">{platform}</p>
                  <div className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg">
                    <p className="text-slate-300 text-sm flex-1">{caption}</p>
                    <CopyButton text={caption} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* Micro-clips */}
      {output.micro_clips && output.micro_clips.length > 0 && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Micro-clips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {output.micro_clips.map((clip, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm text-slate-400">{clip.label}</p>
                <video
                  src={clip.url}
                  controls
                  className="w-full rounded-lg bg-slate-800 max-h-48"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Posting Status */}
      {output.posting_status && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Posting Status</h3>
          <div className="space-y-2">
            {Object.entries(output.posting_status).map(([platform, status]) => {
              if (!status) return null
              return (
                <div key={platform} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300 capitalize font-medium">{platform}</span>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${statusColors[status] || ''}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
