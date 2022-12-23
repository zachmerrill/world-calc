import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import JourneyNavigation from "../../components/journey/navigation";
import Title from "../../components/title";
import STORAGES from "../../constants/storages";
import useLocalStorage from "../../hooks/useLocalStorage";
import dataFetcher from "../../util/dataFetcher";

export const initialLanguagesValue: string[] = ["English"];

export default function Languages() {
  const { data, error } = useSWR("/api/languageData", dataFetcher);
  const [knownLanguages, setKnownLanguages] = useState<string[]>(
    initialLanguagesValue
  );
  const [languagesStorage, setLanguagesStorage] = useLocalStorage<string[]>(
    STORAGES.languages,
    initialLanguagesValue
  );
  const [language, setLanguage] = useState<string>("Unknown");
  const [text, setText] = useState<string>("");
  const [warn, setWarn] = useState<string>("");

  useEffect(() => {
    setKnownLanguages(languagesStorage);
  }, [languagesStorage]);

  function handleChange(value: string) {
    const cleanValue = value.toLowerCase().trim().split("?")[0];
    const newLanguage = Object.keys(data).find(
      (key) => data[key].toLowerCase() === cleanValue
    );
    if (newLanguage) {
      setLanguage(newLanguage);
    } else {
      setLanguage("Unknown");
    }
    setText(value);
  }
  function handleClick() {
    if (language === "Unknown") return;
    if (knownLanguages.includes(language)) {
      setWarn(language);
      return;
    }
    setWarn("");
    setKnownLanguages([...knownLanguages, language]);
  }

  function handleSubmit() {
    setLanguagesStorage(knownLanguages);
  }

  return (
    <>
      <Head>
        <title>Languages | How Big is Your World?</title>
      </Head>
      <main className="flex h-full flex-col">
        <Title>Languages</Title>
        {null}
        {data ? (
          <label>
            Type &quot;How are you?&quot; in as many languages as you can.
            <div className="grid grid-cols-4 items-center">
              <input
                placeholder="How are you?"
                className="col-span-3 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                type="text"
                value={text}
                onChange={(e) => handleChange(e.currentTarget.value)}
              />
              <button className="" onClick={handleClick}>
                {language}
              </button>
            </div>
          </label>
        ) : error ? (
          <>Failed to load language list. 😭</>
        ) : (
          <>Loading...</>
        )}
        <h2>Languages Known:</h2>
        <ul>
          <>
            {knownLanguages.map((lang, index) => (
              <li key={index} className="flex gap-2">
                {lang}{" "}
                {lang === "English" && (
                  <div className="inline-flex items-center rounded-full bg-green-200 px-3 py-1 text-xs font-bold uppercase text-green-700">
                    FREE
                  </div>
                )}
                {lang === warn && (
                  <p className="inline-flex items-center text-xs text-red-500">
                    ⬅ You already have this one!
                  </p>
                )}
              </li>
            ))}
          </>
        </ul>
        <JourneyNavigation onClick={handleSubmit} />
      </main>
    </>
  );
}
