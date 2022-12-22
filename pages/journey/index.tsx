import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Head from "next/head";
import React, { useContext, useEffect, useReducer } from "react";
import { JourneyContext } from "../../contexts/journeyContext";
import useLocalStorage from "../../hooks/useLocalStorage";
countries.registerLocale(enLocale);
const countryObj = countries.getNames("en", { select: "official" });

const countryArr = Object.entries(countryObj).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

type Form = {
  name: string;
  country: string;
  valid: boolean;
};

const initialState: Form = {
  name: "",
  country: "",
  valid: false,
};

export default function Journey() {
  const [name, setName] = useLocalStorage<string>("name", "");
  const [country, setCountry] = useLocalStorage<string>("country", "");

  useEffect(() => {
    // update form from localstorage if available
    dispatch({ type: "nameChange", value: name });
    dispatch({ type: "countryChange", value: country });
  }, [name, country]);

  const [form, dispatch] = useReducer(
    (state: Form, action: { type: string; value: string }) => {
      switch (action.type) {
        case "nameChange":
          return {
            ...state,
            name: action.value,
            valid: !!action.value && !!state.country,
          };
        case "countryChange":
          return {
            ...state,
            country: action.value,
            valid: !!action.value && !!state.name,
          };
        default:
          return state;
      }
    },
    initialState
  );
  const { nextPage } = useContext(JourneyContext);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      country: { value: string };
    };
    setName(target.name.value);
    setCountry(target.country.value);
    nextPage();
  }

  return (
    <>
      <Head>
        <title>How Big is Your World?</title>
      </Head>
      <main>
        <h1 className="mt-0 mb-2 text-6xl font-extrabold">
          Tell me about yourself.{" "}
          <span className="font-extralight text-red-500">*</span>
        </h1>
        <p className="flex justify-end text-xs font-normal text-red-500">
          * This affects your score! 😱
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            What&apos;s your name?
            <input
              name="name"
              className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              type="text"
              placeholder="John Smith"
              value={form.name}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                dispatch({ type: "nameChange", value: e.currentTarget.value })
              }
            />
          </label>
          <label>
            Where do you live?
            <select
              name="country"
              className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                dispatch({
                  type: "countryChange",
                  value: e.currentTarget.value,
                })
              }
              value={form.country}
            >
              <option className="text-slate-400" value="">
                Select a country
              </option>
              {countryArr.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <input
            disabled={!form.valid}
            type="submit"
            value="Next"
            className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50 hover:from-emerald-600 hover:to-emerald-400 disabled:from-slate-500 disabled:to-slate-500 disabled:text-slate-400"
          />
        </form>
      </main>
    </>
  );
}
