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
import JourneyNavigation from "../../components/journey/navigation";
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
  const { data, error } = useSWR("/api/mapData", dataFetcher);

  useEffect(() => {
    setSelectedCountries(countries.map((code) => ALPHA2CODES[code]));
  }, [countries]);

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
      <main className="flex h-full w-full flex-col justify-between">
        <Title className="absolute z-10 w-full bg-white">Countries</Title>

        <div className="absolute z-0 h-full w-full">
          {data ? (
            <ComposableMap className="absolute h-full w-full">
              <ZoomableGroup center={[0, 0]} zoom={1}>
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
        <JourneyNavigation
          className="absolute bottom-0 z-10 w-full bg-white"
          onClick={handleSubmit}
        />
      </main>
    </>
  );
}
