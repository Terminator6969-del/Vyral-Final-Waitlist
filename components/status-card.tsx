'use client'

import { Card } from '@/components/ui/card'
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

interface StatusCardProps {
  status: string
  isLoading: boolean
}

const statusMessages = {
  queued: 'Your request is queued and will be processed soon.',
  running: 'Processing your request. This may take a few moments.',
  done: 'Processing complete!',
  failed: 'Processing failed. Please try again.',
}

export default function StatusCard({ status, isLoading }: StatusCardProps) {
  const getMessage = (s: string) => statusMessages[s as keyof typeof statusMessages] || 'Processing...'

  return (
    <Card className="glass-card p-6">
      <div className="flex items-start gap-4">
        {status === 'done' ? (
          <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
        ) : status === 'failed' ? (
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
        ) : (
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin flex-shrink-0 mt-0.5" />
        )}
        <div>
          <p className={`font-medium ${
            status === 'done'
              ? 'text-green-400'
              : status === 'failed'
              ? 'text-red-400'
              : 'text-blue-400'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
          <p className="text-slate-400 text-sm mt-1">{getMessage(status)}</p>
        </div>
      </div>
    </Card>
  )
}
