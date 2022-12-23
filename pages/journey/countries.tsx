import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import useSWR from "swr";
import { AboutYou } from ".";
import JourneyNavigation from "../../components/journey/navigation";
import Layout from "../../components/layout";
import Title from "../../components/title";
import COLORS from "../../constants/colors";
import STORAGES from "../../constants/storages";
import useLocalStorage from "../../hooks/useLocalStorage";
import dataFetcher from "../../util/dataFetcher";

countries.registerLocale(enLocale);
const ALPHA2CODES = countries.getAlpha2Codes();
const ALPHA3CODES = countries.getAlpha3Codes();

export default function Countries() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countries, setCountries] = useLocalStorage<string[]>(
    STORAGES.countries,
    []
  );
  const [you] = useLocalStorage<Omit<AboutYou, "name">>(STORAGES.you, {
    country: "",
  });
  const { data, error } = useSWR("/api/mapData", dataFetcher);

  useEffect(() => {
    if (you.country) {
      setSelectedCountries([
        ALPHA2CODES[you.country],
        ...countries.map((code) => ALPHA2CODES[code]),
      ]);
    } else {
      setSelectedCountries(countries.map((code) => ALPHA2CODES[code]));
    }
  }, [countries, you]);

  function handleClick(id: string) {
    if (selectedCountries.includes(id)) {
      setSelectedCountries(selectedCountries.filter((code) => code !== id));
    } else {
      setSelectedCountries([...selectedCountries, id]);
    }
  }

  function handleSubmit() {
    setCountries(selectedCountries.map((code) => ALPHA3CODES[code]));
  }

  return (
    <>
      <Head>
        <title>Countries | How Big is Your World?</title>
      </Head>
      <Layout className="flex flex-col p-0">
        <div className="p-4">
          <Title>Countries</Title>
          <p className="text-lg">
            Select all countries on the map which you have visited.
          </p>
        </div>

        <div className="relative flex h-full items-center justify-center">
          {data ? (
            <ComposableMap className="absolute left-0 h-full">
              <ZoomableGroup center={[100, 0]} zoom={1}>
                <Geographies geography={data}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          selectedCountries.includes(geo.id)
                            ? COLORS.gold
                            : COLORS.navy
                        }
                        stroke="#fff"
                        strokeWidth={0.5}
                        onClick={() => handleClick(geo.id)}
                        style={{
                          default: {
                            outline: "none",
                          },
                          hover: {
                            outline: "none",
                          },
                          pressed: {
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          ) : error ? (
            <>Failed to load map. 😭</>
          ) : (
            <>Loading...</>
          )}
        </div>
        <JourneyNavigation onClick={handleSubmit} className="p-4" />
      </Layout>
    </>
  );
}
