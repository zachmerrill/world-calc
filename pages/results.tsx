import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import JourneyNextButton from "../components/journey/next";
import Title from "../components/title";
import { JourneyContext } from "../contexts/journeyContext";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";
import { PieChart } from "react-minimal-pie-chart";
import STORAGES from "../constants/storages";
import { AboutYou, initialYouState } from "./journey";
import { Family, initialFamilyState } from "./journey/family";
import { initialLanguagesValue } from "./journey/languages";
import useSWR from "swr";
import dataFetcher from "../util/dataFetcher";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
const countryObj = countries.getNames("en", { select: "official" });

export default function Results() {
  const router = useRouter();
  const { prevPage, pageList } = useContext(JourneyContext);
  const { data: langData, error: langError } = useSWR(
    "/api/languageData",
    dataFetcher
  );
  const { data: cityData, error: cityError } = useSWR(
    "/api/cityData",
    dataFetcher
  );

  // get all the storages
  const [youStorage] = useLocalStorage<AboutYou>(STORAGES.you, initialYouState);
  const [familyStorage] = useLocalStorage<Family>(
    STORAGES.family,
    initialFamilyState
  );
  const [countriesStorage] = useLocalStorage<string[]>(STORAGES.countries, []);
  const [citiesStorage] = useLocalStorage<string[]>(STORAGES.cities, []);
  const [languagesStorage, setLanguagesStorage] = useLocalStorage<string[]>(
    STORAGES.languages,
    initialLanguagesValue
  );

  const worldSize = useMemo<number>(() => {
    if (!langData || !cityData) return -1;
    const langScore = languagesStorage.length / Object.keys(langData).length;
    const cities = [
      ...cityData["Asia"],
      ...cityData["Middle East"],
      ...cityData["Africa"],
      ...cityData["Europe"],
      ...cityData["North America"],
      ...cityData["South America"],
      ...cityData["Oceania"],
    ];
    const cityScore = citiesStorage.length / cities.length;
    const countriesScore =
      countriesStorage.length / Object.keys(countryObj).length;
    let familyScore = familyStorage.siblings || 0;
    if (familyStorage.fatherBirthLoc !== youStorage.country) familyScore++;
    if (familyStorage.motherBirthLoc !== youStorage.country) familyScore++;
    const youScore = youStorage.name?.length || 0;
    return (
      (langScore + cityScore + countriesScore + familyScore + youScore) * 100
    );
  }, [
    langData,
    cityData,
    languagesStorage.length,
    citiesStorage.length,
    countriesStorage.length,
    familyStorage.siblings,
    familyStorage.fatherBirthLoc,
    familyStorage.motherBirthLoc,
    youStorage.country,
    youStorage.name?.length,
  ]);

  function handleClick() {
    clearLocalStorage();
    router.push(pageList[0]);
  }

  return (
    <>
      <Head>
        <title>Results | How Big is Your World?</title>
      </Head>
      <Title>Results</Title>
      <p>Your world is about {Math.round(worldSize)}% of planet earth!</p>
      <div className="flex w-full justify-between">
        <JourneyNextButton onClick={() => prevPage()}>
          Previous
        </JourneyNextButton>
        <button
          onClick={handleClick}
          className="flex w-32 justify-center rounded-full bg-gradient-to-r from-red-600 via-red-600 to-red-400 p-2 font-bold text-cyan-50 hover:from-red-600 hover:to-red-400"
        >
          Start over!
        </button>
      </div>
    </>
  );
}
