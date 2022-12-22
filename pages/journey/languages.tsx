import Head from "next/head";
import JourneyNavigation from "../../components/journey/navigation";
import Title from "../../components/title";

export default function Languages() {
  return (
    <>
      <Head>
        <title>Languages | How Big is Your World?</title>
      </Head>
      <main className="flex h-full flex-col">
        <Title>Languages</Title>
        <JourneyNavigation />
      </main>
    </>
  );
}
