import { useEffect, useState } from "react";
import {
  fetchFlashCards,
  reviewFlashCard,
} from "../../services/flashCardService";
import FuriganaText from "../../components/FuriganaText";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
} from "@mui/material";

const getRandomElement = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

function FlashCardFlipper({ card, showFront, setShowFront, setRating }) {
  return (
    <Card>
      <CardHeader
        title={<FuriganaText text={card.flash_card_content.japanese_example} />}
      />
      <CardContent>
        {!showFront && (
          <>
            {card.flash_card_content.dictionary_form !==
              card.flash_card_content.japanese_example && (
              <div>{card.flash_card_content.dictionary_form}</div>
            )}
            <div>{card.flash_card_content.teaching_notes}</div>
            <br />
            <div>{card.flash_card_content.input_text}</div>
            <div>{card.flash_card_content.translated_text}</div>
          </>
        )}
      </CardContent>
      <CardActions>
        {showFront ? (
          <Button onClick={() => setShowFront(false)}>Reveal</Button>
        ) : (
          <div>
            <div>
              <Button onClick={() => setRating(card.flash_card_id, "Again")}>
                Again
              </Button>
              <Button onClick={() => setRating(card.flash_card_id, "Hard")}>
                Hard
              </Button>
              <Button onClick={() => setRating(card.flash_card_id, "Good")}>
                Good
              </Button>
              <Button onClick={() => setRating(card.flash_card_id, "Easy")}>
                Easy
              </Button>
            </div>
          </div>
        )}
      </CardActions>
    </Card>
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
    <Container>
      {cards.length === 0 && (
        <Box sx={{p: 4}}>
          No cards to review 😎
        </Box>
      )}
      {card !== null && (
        <FlashCardFlipper
          card={card}
          showFront={showFront}
          setShowFront={setShowFront}
          setRating={setRating}
        />
      )}
    </Container>
  );
}

/*
export default function FlashCardStudy() {
  return <FlashCardList />;
}
*/
