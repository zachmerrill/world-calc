import Head from "next/head";
import { useEffect, useReducer } from "react";
import CountryOptions from "../../components/countryOptions";
import JourneyNavigation from "../../components/journey/navigation";
import Title from "../../components/title";
import STORAGES from "../../constants/storages";
import useLocalStorage from "../../hooks/useLocalStorage";

type Form = {
  siblings?: number;
  fatherBirthLoc?: string;
  motherBirthLoc?: string;
};

const initialState: Form = {
  siblings: 0,
  fatherBirthLoc: "",
  motherBirthLoc: "",
};

export default function Family() {
  const [family, setFamily] = useLocalStorage<Form>(
    STORAGES.family,
    initialState
  );
  const [you] = useLocalStorage<{ country: string }>(STORAGES.you, {
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
    (state: Form, action: Form) => ({
      ...state,
      ...action,
    }),
    initialState
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
      <Title>How big is your family?</Title>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            Siblings?
            <div className="grid grid-cols-4 items-center justify-center gap-4">
              <input
                name="siblings"
                type="range"
                min={0}
                max={10}
                value={form.siblings}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  updateForm({ siblings: Number(e.currentTarget.value) })
                }
                className="col-span-3 h-2 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
              />
              <div>
                <p className="text-center text-lg">{form.siblings}</p>
              </div>
            </div>
          </label>
          <label>
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
          </label>
          <label>
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
          </label>
          <JourneyNavigation
            disabled={!(!!form.fatherBirthLoc && !!form.motherBirthLoc)}
            type="submit"
          />
        </form>
      </main>
    </>
  );
}
