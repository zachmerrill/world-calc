import Head from "next/head";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import JourneyNavigation from "../../components/journey/navigation";
import Label from "../../components/label";
import Layout from "../../components/layout";
import TextInput from "../../components/textInput";
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
      <Layout className="flex flex-col justify-between gap-4">
        <div>
          <Title>Languages</Title>
          {data ? (
            <div className="grid grid-cols-6 items-center gap-2">
              <div className="col-span-4 text-sm">
                Type &quot;How are you?&quot; in as many languages as you can.
              </div>
              <div className="col-span-2 text-center text-xs">
                Language Detection
              </div>
              <TextInput
                className="col-span-4"
                placeholder="How are you?"
                type="text"
                value={text}
                onChange={(e) => handleChange(e.currentTarget.value)}
              />
              <button
                className="col-span-2 flex w-full justify-center rounded-md bg-sky-600 p-2 font-bold text-cyan-50 hover:bg-sky-500 disabled:border-2  disabled:border-solid disabled:border-slate-500 disabled:bg-white disabled:text-slate-500"
                disabled={language === "Unknown"}
                onClick={handleClick}
              >
                {language !== "Unknown" && "+"}
                {language}
              </button>
            </div>
          ) : error ? (
            <>Failed to load language list. 😭</>
          ) : (
            <>Loading...</>
          )}
          <h2 className="py-2 text-lg font-semibold">Languages Known:</h2>
          <ul className="list-disc">
            <>
              {knownLanguages.map((lang, index) => (
                <li key={index} className="ml-8">
                  <span className="flex gap-2">
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
                  </span>
                </li>
              ))}
            </>
          </ul>
        </div>
        <JourneyNavigation onClick={handleSubmit} />
      </Layout>
    </>
  );
}
