'use client'

import { Card } from '@/components/ui/card'
import { Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import CopyButton from '../copy-button'

interface FlowAOutput {
  project_id?: string
  transcript?: string
  strategy?: {
    hook: string
    hook_variations: string[]
    archetype?: string
    pacing?: string
    emotion_curve?: string
    viral_analysis?: string
  }
  scripts?: Array<{
    length: '15s' | '30s' | '45s' | '60s'
    items: Array<{ title: string; body: string; cta: string }>
  }>
  caption_pack?: {
    captions: string[]
    hashtags: string[]
  }
}

export default function FlowAResult({ output }: { output: FlowAOutput }) {
  if (!output) return null

  return (
    <div className="space-y-6">
      {/* Strategy */}
      {output.strategy && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Strategy</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-400">Primary Hook</p>
              <p className="text-slate-200 font-medium">{output.strategy.hook}</p>
            </div>
            {output.strategy.archetype && (
              <div>
                <p className="text-sm text-slate-400">Archetype</p>
                <p className="text-slate-200 font-medium">{output.strategy.archetype}</p>
              </div>
            )}
            {output.strategy.pacing && (
              <div>
                <p className="text-sm text-slate-400">Pacing</p>
                <p className="text-slate-200 font-medium">{output.strategy.pacing}</p>
              </div>
            )}
            {output.strategy.emotion_curve && (
              <div>
                <p className="text-sm text-slate-400">Emotion Curve</p>
                <p className="text-slate-200 font-medium">{output.strategy.emotion_curve}</p>
              </div>
            )}
            {output.strategy.viral_analysis && (
              <div>
                <p className="text-sm text-slate-400">Viral Analysis</p>
                <p className="text-slate-200 text-sm">{output.strategy.viral_analysis}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Hook Variations */}
      {output.strategy?.hook_variations && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Hook Variations</h3>
          <div className="space-y-2">
            {output.strategy.hook_variations.map((hook, i) => (
              <div key={i} className="flex items-start justify-between gap-3 p-3 bg-slate-800/30 rounded-lg">
                <p className="text-slate-300 text-sm flex-1">{hook}</p>
                <CopyButton text={hook} />
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Scripts */}
      {output.scripts && output.scripts.length > 0 && (
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Scripts</h3>
          <div className="space-y-6">
            {output.scripts.map((scriptGroup, groupIdx) => (
              <div key={groupIdx}>
                <h4 className="text-sm font-medium text-purple-400 mb-3">{scriptGroup.length}</h4>
                <div className="space-y-3">
                  {scriptGroup.items?.map((script, idx) => (
                    <div key={idx} className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="font-medium text-slate-200">{script.title}</p>
                        <CopyButton text={`${script.title}\n\n${script.body}\n\n${script.cta}`} />
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{script.body}</p>
                      <p className="text-slate-300 text-sm font-medium text-cyan-400">{script.cta}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Captions & Hashtags */}
      {output.caption_pack && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Captions</h3>
            <div className="space-y-2">
              {output.caption_pack.captions?.map((caption, i) => (
                <div key={i} className="flex items-start justify-between gap-3 p-3 bg-slate-800/30 rounded-lg">
                  <p className="text-slate-300 text-sm flex-1">{caption}</p>
                  <CopyButton text={caption} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-50">Hashtags</h3>
              <CopyButton 
                text={output.caption_pack.hashtags?.join(' ') || ''} 
                label="Copy all"
              />
            </div>
            <div className="space-y-2">
              {output.caption_pack.hashtags?.map((tag, i) => (
                <span key={i} className="inline-block px-3 py-1 bg-slate-800/50 text-cyan-400 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
