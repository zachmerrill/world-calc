import Head from "next/head";
import NextButton from "../../components/journey/next";
import useSWR from "swr";
import dataFetcher from "../../util/dataFetcher";
import Title from "../../components/journey/title";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

function City({
  children,
  id,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
      <div className="flex items-center pl-3">
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
          {...rest}
        />
        <label
          htmlFor={id}
          className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {children}
        </label>
      </div>
    </li>
  );
}

export default function Cities() {
  const { data, error } = useSWR("/api/cityData", dataFetcher);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [citiesStorage, setCitiesStorage] = useLocalStorage<string[]>(
    "cities",
    []
  );

  useEffect(() => {
    setSelectedCities(citiesStorage);
  }, [citiesStorage]);

  function handleChanged(e: React.FormEvent<HTMLInputElement>) {
    const currentCity = e.currentTarget.value;
    if (selectedCities.includes(currentCity)) {
      setSelectedCities(selectedCities.filter((city) => city !== currentCity));
    } else {
      setSelectedCities([...selectedCities, e.currentTarget.value]);
    }
  }

  function handleSubmit() {
    setCitiesStorage(selectedCities);
  }

  return (
    <>
      <Head>
        <title>Cities | How Big is Your World?</title>
      </Head>
      <main className="flex h-full flex-col">
        <Title>Cities</Title>
        <div className="flex justify-center">
          {error ? <>Failed to load city list. 😭</> : null}
          {data ? (
            <ul className="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
              {data.map((city: string, index: number) => {
                const cityValue = city.toLowerCase();
                return (
                  <City
                    key={index}
                    id={cityValue}
                    value={cityValue}
                    name={cityValue}
                    onChange={handleChanged}
                    checked={selectedCities.includes(cityValue)}
                  >
                    {city}
                  </City>
                );
              })}
            </ul>
          ) : (
            <>Loading...</>
          )}
        </div>
        <NextButton onClick={handleSubmit} />
      </main>
    </>
  );
}
