'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, AlertCircle, Sparkles } from 'lucide-react'
import { useJobStatus } from '@/hooks/use-job-status'
import FlowAResult from './flow-a-result'
import StatusCard from '../status-card'

export default function AnalyzeCompetitor() {
  const [url, setUrl] = useState('')
  const [mode, setMode] = useState<'lite' | 'pro'>('lite')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [jobId, setJobId] = useState<string | null>(null)
  const { status, isLoading, error: jobError } = useJobStatus(jobId)

  const handleAnalyze = async () => {
    if (!url.trim()) return

    try {
      setIsAnalyzing(true)
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_url: url, mode }),
      })

      if (!response.ok) throw new Error('Failed to start analysis')

      const data = await response.json()
      setJobId(data.job_id)
    } catch (err) {
      console.error('Analysis failed:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="glass-card p-6 border-cyan-500/30">
        <h3 className="text-lg font-semibold text-slate-50 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          Analyze Competitor Video
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-slate-300 mb-2">
              Competitor video URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isAnalyzing}
              placeholder="https://tiktok.com/... or https://instagram.com/..."
              className="w-full px-4 py-2 bg-slate-900/50 border border-cyan-500/20 rounded-lg text-slate-50 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 disabled:opacity-50 transition-all"
            />
            <p className="text-xs text-slate-500 mt-1">
              Paste a TikTok, Instagram Reel, or YouTube Short URL
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Analysis Mode
            </label>
            <div className="flex gap-3">
              {['lite', 'pro'].map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={m}
                    checked={mode === m}
                    onChange={(e) => setMode(e.target.value as 'lite' | 'pro')}
                    disabled={isAnalyzing}
                    className="w-4 h-4"
                  />
                  <span className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    mode === m
                      ? 'bg-cyan-500/25 text-cyan-400 border border-cyan-500/40'
                      : 'text-slate-400 bg-slate-900/30 border border-transparent'
                  }`}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!url.trim() || isAnalyzing}
            className="w-full bg-cyan-500/30 hover:bg-cyan-500/40 text-cyan-400 border border-cyan-500/40 rounded-lg font-medium transition-all disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze'
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
              <div>
                <p className="text-red-400 font-medium">Analysis failed</p>
                <p className="text-red-300/70 text-sm">{jobError}</p>
              </div>
            </div>
          </Card>
        )}

        {!status && !jobId && (
          <Card className="glass-card p-8 text-center border-cyan-500/10">
            <p className="text-slate-400">Run an analysis to see scripts, hooks, and captions.</p>
          </Card>
        )}

        {jobId && status && (
          <>
            <StatusCard status={status.status} isLoading={isLoading} />
            {status.status === 'done' && status.type === 'flow_a' && (
              <FlowAResult output={status.output_payload} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
