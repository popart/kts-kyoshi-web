import { useLoaderData } from "react-router-dom";

export async function newFlashCardsLoader() {
  return ["a", "b", "c"];
}
export async function reviewFlashCardsLoader() {
  return ["d", "e", "f"];
}

export default function FlashCardStudy() {
  const cards = useLoaderData();
  return (
    <>
      <div>Review Element </div>
      {cards.map((card, idx) => (
        <div key={idx}>{card}</div>
      ))}
    </>
  );
}
