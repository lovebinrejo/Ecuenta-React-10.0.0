import type { InputHTMLAttributes } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

export function InputField({ label, hint, error, className = '', ...props }: InputFieldProps) {
  return (
    <label className="block space-y-2 text-sm text-slate-300">
      <span className="font-medium text-slate-200">{label}</span>
      <input
        className={`w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''} ${className}`.trim()}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-slate-400">{hint}</p> : null}
      {error ? <p className="text-xs text-rose-400">{error}</p> : null}
    </label>
  )
}
