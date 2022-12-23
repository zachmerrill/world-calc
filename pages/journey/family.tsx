import Head from "next/head";
import { useEffect, useReducer } from "react";
import { AboutYou } from ".";
import CountryOptions from "../../components/countryOptions";
import Form from "../../components/form";
import JourneyNavigation from "../../components/journey/navigation";
import Label from "../../components/label";
import Layout from "../../components/layout";
import Title from "../../components/title";
import STORAGES from "../../constants/storages";
import useLocalStorage from "../../hooks/useLocalStorage";

export type Family = {
  siblings?: number;
  fatherBirthLoc?: string;
  motherBirthLoc?: string;
};

export const initialFamilyState: Family = {
  siblings: 0,
  fatherBirthLoc: "",
  motherBirthLoc: "",
};

export default function Family() {
  const [family, setFamily] = useLocalStorage<Family>(
    STORAGES.family,
    initialFamilyState
  );
  const [you] = useLocalStorage<Omit<AboutYou, "name">>(STORAGES.you, {
    country: "",
  });

  useEffect(() => {
    // default family to your location
    if (!family.fatherBirthLoc) family.fatherBirthLoc = you.country;
    if (!family.motherBirthLoc) family.motherBirthLoc = you.country;
    // update form from localstorage if available
    updateForm(family);
  }, [family, you]);

  const [form, updateForm] = useReducer(
    (state: Family, action: Family) => ({
      ...state,
      ...action,
    }),
    initialFamilyState
  );

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      siblings: { value: number };
      fatherBirthLoc: { value: string };
      motherBirthLoc: { value: string };
    };
    setFamily({
      siblings: target.siblings.value,
      fatherBirthLoc: target.fatherBirthLoc.value,
      motherBirthLoc: target.motherBirthLoc.value,
    });
  }

  return (
    <>
      <Head>
        <title>Family | How Big is Your World?</title>
      </Head>
      <Layout>
        <Form onSubmit={handleSubmit} className="h-full justify-between">
          <div className="flex flex-col gap-4">
            <Title>Your Family</Title>
            <Label>
              How many siblings do you have?
              <div className="grid h-20 grid-cols-4 items-center justify-center gap-4">
                <input
                  name="siblings"
                  type="range"
                  min={0}
                  max={12}
                  value={form.siblings}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    updateForm({ siblings: Number(e.currentTarget.value) })
                  }
                  className="col-span-3 h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                />
                <p className="flex flex-col items-center justify-center text-center">
                  {form.siblings ? familyEmoji(form?.siblings) : "0"}
                </p>
              </div>
            </Label>
            <Label>
              Where was your mother born?
              <select
                name="motherBirthLoc"
                className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                value={form.motherBirthLoc}
                onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                  updateForm({ motherBirthLoc: e.currentTarget.value })
                }
              >
                <option className="text-slate-400" value="">
                  Please select
                </option>
                <CountryOptions />
              </select>
            </Label>
            <Label>
              Where was your father born?
              <select
                name="fatherBirthLoc"
                className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                value={form.fatherBirthLoc}
                onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                  updateForm({ fatherBirthLoc: e.currentTarget.value })
                }
              >
                <option className="text-slate-400" value="">
                  Please select
                </option>
                <CountryOptions />
              </select>
            </Label>
          </div>
          <JourneyNavigation
            disabled={!(!!form.fatherBirthLoc && !!form.motherBirthLoc)}
            type="submit"
          />
        </Form>
      </Layout>
    </>
  );
}

function familyEmoji(siblings: number): string[] {
  if (siblings == 0) return ["0"];
  const emojis: string[] = [];
  for (let i = 0; i < siblings; i++) {
    emojis.push("👩");
  }
  return emojis;
}
