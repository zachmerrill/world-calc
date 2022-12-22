import Head from "next/head";
import React, { useContext, useEffect, useReducer } from "react";
import CountryOptions from "../../components/journey/countryOptions";
import Title from "../../components/journey/title";
import { JourneyContext } from "../../contexts/journeyContext";
import useLocalStorage from "../../hooks/useLocalStorage";

type Form = {
  name?: string;
  country?: string;
};

const initialState: Form = {
  name: "",
  country: "",
};

export default function Journey() {
  const [you, setYou] = useLocalStorage<Form>("aboutYou", initialState);

  useEffect(() => {
    // update form from localstorage if available
    updateForm(you);
  }, [you]);

  const [form, updateForm] = useReducer(
    (state: Form, action: Form) => ({
      ...state,
      ...action,
    }),
    initialState
  );
  const { nextPage } = useContext(JourneyContext);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      country: { value: string };
    };
    setYou({ name: target.name.value, country: target.country.value });
    nextPage();
  }

  return (
    <>
      <Head>
        <title>Start | How Big is Your World?</title>
      </Head>
      <main>
        <Title>
          Tell me about yourself.{" "}
          <span className="font-extralight text-red-500">*</span>
        </Title>
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
                updateForm({ name: e.currentTarget.value })
              }
            />
          </label>
          <label>
            Where do you live?
            <select
              name="country"
              className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                updateForm({
                  country: e.currentTarget.value,
                })
              }
              value={form.country}
            >
              <option className="text-slate-400" value="">
                Select a country
              </option>
              <CountryOptions />
            </select>
          </label>
          <input
            disabled={!(!!form.name && !!form.country)}
            type="submit"
            value="Next"
            className="flex w-32 justify-center rounded-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-400 p-2 font-bold text-cyan-50 hover:from-emerald-600 hover:to-emerald-400 disabled:from-slate-500 disabled:to-slate-500 disabled:text-slate-400"
          />
        </form>
      </main>
    </>
  );
}
