import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);
const countryObj = countries.getNames("en", { select: "official" });

const countryArr = Object.entries(countryObj).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

export default function CountryOptions() {
  return (
    <>
      {countryArr.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </>
  );
}
