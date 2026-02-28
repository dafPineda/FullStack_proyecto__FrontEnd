export default function Input({ className = '', ...props }) {
  return (
    <input 
      className={[
        'w-full px-3 py-2 rounded-lg border border-slate-200 bg-white',
        'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent',
        'text-black placeholder:text-slate-400 caret-black',
        className
      ].join(' ')}
      {...props}
    />
  )
}