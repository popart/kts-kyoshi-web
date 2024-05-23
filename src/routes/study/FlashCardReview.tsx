import { useEffect, useState } from "react";
import {
  fetchFlashCards,
  reviewFlashCard,
} from "../../services/flashCardService";
import FuriganaText from "../../components/FuriganaText";

const getRandomElement = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

function FlashCardFlipper({ card, showFront, setShowFront, setRating }) {
  return (
    <div>
      <div
        css={{
          backgroundColor: "indianRed",
          borderRadius: "9px",
        }}
      >
        <FuriganaText text={card.flash_card_content.japanese_example} />
        <br />
        {card.flash_card_content.japanese_example}
      </div>
      {showFront ? (
        <div
          css={{
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <button onClick={() => setShowFront(false)}>Reveal</button>
        </div>
      ) : (
        <div>
          {card.flash_card_content.dictionary_form !==
            card.flash_card_content.japanese_example && (
            <div>{card.flash_card_content.dictionary_form}</div>
          )}
          <div>{card.flash_card_content.teaching_notes}</div>
          <br />
          <div>{card.flash_card_content.input_text}</div>
          <div>{card.flash_card_content.translated_text}</div>
          <div>
            <button onClick={() => setRating(card.flash_card_id, "Again")}>Again</button>
            <button onClick={() => setRating(card.flash_card_id, "Hard")}>Hard</button>
            <button onClick={() => setRating(card.flash_card_id, "Good")}>Good</button>
            <button onClick={() => setRating(card.flash_card_id, "Easy")}>Easy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FlashCardReview() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const [showFront, setShowFront] = useState(true);

  const loadFlashCards = async () => {
    const res = await fetchFlashCards("review");
    console.log(res);
    setCards(res);
    setCard(getRandomElement(res));
    setShowFront(true);
  };

  useEffect(() => {
    loadFlashCards();
  }, []);

  async function setRating(flashCardId, rating) {
    // TODO: show some transition
    await reviewFlashCard(flashCardId, rating);
    loadFlashCards();
  }

  return (
    <div>
      {cards.length === 0 && <div> No cards to review 😎</div>}
      {card !== null && (
        <FlashCardFlipper
          card={card}
          showFront={showFront}
          setShowFront={setShowFront}
          setRating={setRating}
        />
      )}
    </div>
  );
}

/*
export default function FlashCardStudy() {
  return <FlashCardList />;
}
*/
