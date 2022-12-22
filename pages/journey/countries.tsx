import Head from "next/head";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import NextButton from "../../components/journey/next";
import Title from "../../components/journey/title";
import COLORS from "../../constants/colors";

import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

countries.registerLocale(enLocale);
const ALPHA2CODES = countries.getAlpha2Codes();
const ALPHA3CODES = countries.getAlpha3Codes();

export default function Countries() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [countries, setCountries] = useLocalStorage<string[]>("countries", []);

  useEffect(() => {
    setSelectedCountries(countries.map((code) => ALPHA2CODES[code]));
  }, [countries]);

  console.log(selectedCountries);
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
      <main className="flex h-full flex-col">
        <Title>What countries have you been to?</Title>
        <ComposableMap className="h-full">
          <ZoomableGroup center={[0, 0]} zoom={1}>
            <Geographies geography="/map.json">
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
                    onClick={() => handleClick(geo.id)}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <NextButton onClick={handleSubmit} />
        {/* <input name="countries" type="text" value={selectedCountries} /> */}
        {/* <input
            disabled={!!!selectedCountries}
            type="submit"
            value="Next"
            className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50 hover:from-emerald-600 hover:to-emerald-400 disabled:from-slate-500 disabled:to-slate-500 disabled:text-slate-400"
          /> */}
      </main>
    </>
  );
}
