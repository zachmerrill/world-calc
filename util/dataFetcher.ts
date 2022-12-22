export default function dataFetcher(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => JSON.parse(data));
}
