import { useContext } from "react";
import { JourneyContext } from "../../contexts/journeyContext";

export default function JourneyNextButton({
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { nextPage } = useContext(JourneyContext);

  return (
    <button
      onClick={(e) => {
        if (onClick) onClick(e);
        nextPage();
      }}
      className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50 hover:from-emerald-600 hover:to-emerald-400 disabled:from-slate-500 disabled:to-slate-500 disabled:text-slate-400"
      {...rest}
    >
      Next
    </button>
  );
}
