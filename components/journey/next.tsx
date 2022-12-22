export default function JourneyNextButton({
  disabled,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50 hover:from-emerald-600 hover:to-emerald-400 disabled:from-slate-500 disabled:to-slate-500 disabled:text-slate-400"
      disabled={disabled}
      {...rest}
    />
  );
}
