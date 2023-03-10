import Head from "next/head";
import React, { useContext, useEffect, useReducer } from "react";
import CountryOptions from "../../components/countryOptions";
import Form from "../../components/form";
import JourneyNextButton from "../../components/journey/next";
import Label from "../../components/label";
import Layout from "../../components/layout";
import TextInput from "../../components/textInput";
import Title from "../../components/title";
import STORAGES from "../../constants/storages";
import { JourneyContext } from "../../contexts/journeyContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export type AboutYou = {
  name?: string;
  country?: string;
};

export const initialYouState: AboutYou = {
  name: "",
  country: "",
};

export default function Journey() {
  const [you, setYou] = useLocalStorage<AboutYou>(
    STORAGES.you,
    initialYouState
  );

  useEffect(() => {
    // update form from localstorage if available
    updateForm(you);
  }, [you]);

  const [form, updateForm] = useReducer(
    (state: AboutYou, action: AboutYou) => ({
      ...state,
      ...action,
    }),
    initialYouState
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
      <Layout>
        <Form onSubmit={handleSubmit} className="h-full justify-between">
          <div className="flex flex-col gap-4">
            <div>
              <Title>
                About You
                <span className="font-extralight text-red-500">*</span>
              </Title>
              <p className="flex justify-end text-xs font-normal text-red-500">
                * This affects your score! 😱
              </p>
            </div>
            <Label>
              What&apos;s your name?
              <TextInput
                name="name"
                type="text"
                placeholder="John Smith"
                value={form.name}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  updateForm({ name: e.currentTarget.value })
                }
              />
            </Label>
            <Label>
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
            </Label>
          </div>
          <div className="flex justify-end">
            <JourneyNextButton
              disabled={!(!!form.name && !!form.country)}
              type="submit"
            >
              Next
            </JourneyNextButton>
          </div>
        </Form>
      </Layout>
    </>
  );
}
