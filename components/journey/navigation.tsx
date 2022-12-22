import { useContext } from "react";
import { JourneyContext } from "../../contexts/journeyContext";
import JourneyNextButton from "./next";

export default function JourneyNavigation({
  onClick,
  disabled,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { nextPage, prevPage } = useContext(JourneyContext);

  return (
    <div className={`flex w-full justify-between ${className}`}>
      <JourneyNextButton
        onClick={(e) => {
          if (onClick) onClick(e);
          prevPage();
        }}
        {...rest}
      >
        Previous
      </JourneyNextButton>
      <JourneyNextButton
        onClick={(e) => {
          if (onClick) onClick(e);
          nextPage();
        }}
        disabled={disabled}
        {...rest}
      >
        Next
      </JourneyNextButton>
    </div>
  );
}
