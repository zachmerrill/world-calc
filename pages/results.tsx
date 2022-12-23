import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import { PieChart } from "react-minimal-pie-chart";
import useSWR from "swr";
import JourneyNextButton from "../components/journey/next";
import Layout from "../components/layout";
import Title from "../components/title";
import STORAGES from "../constants/storages";
import { JourneyContext } from "../contexts/journeyContext";
import useLocalStorage, { clearLocalStorage } from "../hooks/useLocalStorage";
import dataFetcher from "../util/dataFetcher";
import { AboutYou, initialYouState } from "./journey";
import { Family, initialFamilyState } from "./journey/family";
import { initialLanguagesValue } from "./journey/languages";

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
  const [languagesStorage] = useLocalStorage<string[]>(
    STORAGES.languages,
    initialLanguagesValue
  );
  const cities = useMemo<string[]>(() => {
    if (!cityData) return [];
    return [
      ...cityData["Eastern Asia"],
      ...cityData["Western Asia"],
      ...cityData["Africa"],
      ...cityData["Europe"],
      ...cityData["North America"],
      ...cityData["South America"],
      ...cityData["Oceania"],
    ];
  }, [cityData]);

  const worldSize = useMemo<number>(() => {
    if (!langData) return -1;
    const langScore = languagesStorage.length / Object.keys(langData).length;
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
    languagesStorage.length,
    citiesStorage.length,
    cities.length,
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
      <Layout>
        <Title>Results</Title>
        {langData && cityData ? (
          <>
            <p className="text-lg">
              You scored a{" "}
              <u className="text-bold text-xl">{Math.round(worldSize)}</u> based
              on your selections.
            </p>
            <p className="text-lg">Keep scrolling to find out why!</p>
            <div>
              <div className="flex flex-col justify-center py-2">
                <p className="font-bold">About You</p>
                <p className="text-sm">
                  Your name is {youStorage.name?.length || 0} characters long --
                  which we arbitrarily added to your score 😎
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col justify-center py-2">
                <p className="font-bold">Family</p>
                <p className="text-sm">
                  You have {familyStorage.siblings || 0} siblings.
                  {familyStorage.fatherBirthLoc !== youStorage.country ? (
                    <p>
                      Your father was born in {familyStorage.fatherBirthLoc}{" "}
                      which is another point.
                    </p>
                  ) : null}
                  {familyStorage.motherBirthLoc !== youStorage.country ? (
                    <p>
                      Your mother was born in {familyStorage.motherBirthLoc}{" "}
                      which is another point.
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
            <ResultChart
              title="Countries"
              desc={`You have visited ${countriesStorage.length} of the countries in the world.`}
              value={countriesStorage.length}
              total={Object.keys(countryObj).length}
              valueColor="#66BE0E"
              totalColor="#2295E8"
            />
            <ResultChart
              title="Cities"
              desc={`You have visited ${citiesStorage.length} cities out of the ${cities.length} in our list.`}
              value={citiesStorage.length}
              total={cities.length}
              valueColor="#66BE0E"
              totalColor="#2295E8"
            />
            <ResultChart
              title="Languages"
              desc={`You speak ${
                languagesStorage.length
              } languages out of the ${
                Object.keys(langData).length
              } in our list.`}
              value={languagesStorage.length}
              total={Object.keys(langData).length}
              valueColor="#66BE0E"
              totalColor="#2295E8"
            />
          </>
        ) : (
          <>Loading...</>
        )}
        <div className="flex w-full justify-between py-4">
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
      </Layout>
    </>
  );
}

function ResultChart({ title, desc, value, total, valueColor, totalColor }) {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 flex flex-col justify-center">
        <p className="font-bold">{title}</p>
        <p className="text-sm">{desc}</p>
      </div>
      <PieChart
        data={[
          {
            title: "You",
            value: value,
            color: valueColor,
          },
          {
            title: "All",
            value: total - value,
            color: totalColor,
          },
        ]}
        radius={40}
        segmentsShift={2}
      />
    </div>
  );
}
