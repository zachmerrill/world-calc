import { useRouter } from "next/router";
import { useContext } from "react";
import JourneyNextButton from "../components/journey/next";
import { JourneyContext } from "../contexts/journeyContext";
import { clearLocalStorage } from "../hooks/useLocalStorage";

export default function Results() {
  const router = useRouter();
  const { pageList } = useContext(JourneyContext);

  function handleClick() {
    clearLocalStorage();
    router.push(pageList[0]);
  }

  return (
    <>
      Results{" "}
      <JourneyNextButton onClick={handleClick}>Start again!</JourneyNextButton>
    </>
  );
}
