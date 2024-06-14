import { useEffect, useState } from "react";
import {
  fetchFlashCards,
  fetchFlashCardCounts,
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
  Collapse,
  Stack,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteFlashCard } from "../../services/flashCardService";

const getRandomElement = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

function FlashCardFlipper({
  card,
  showFront,
  setShowFront,
  setRating,
  callDeleteFlashCard,
}) {
  const theme = useTheme();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const handleDelete = (chatId: string) => {
    return (event) => {
      event.stopPropagation();
      setShowConfirm((currentShowConfirm) => {
        return !currentShowConfirm;
      });
    };
  };
  const handleConfirm = (flashCardId: string) => {
    return async (event) => {
      event.stopPropagation();
      await callDeleteFlashCard(flashCardId);
      setShowConfirm((currentShowConfirm) => {
        return !currentShowConfirm;
      });
    };
  };
  const handleSetRating = (flashCardId, rating) => {
    setRating(flashCardId, rating);
    setShowConfirm(false);
  };

  return (
    <Card sx={{ backgroundColor: theme.palette.secondary.main }}>
      <CardHeader
        title={
          <Stack direction="row" sx={{ alignItems: "flex-end" }}>
            <Box
              sx={{
                flexGrow: 1,
                borderBottom: `1px solid ${theme.palette.text.secondary}`,
              }}
            >
              <FuriganaText text={card.flash_card_content.japanese_example} />
            </Box>
            <Box
              sx={{
                color: theme.palette.text.secondary,
                borderBottom: `1px solid ${theme.palette.text.secondary}`,
              }}
            >
              [{card.flash_card_content.jlpt_level}]
            </Box>
          </Stack>
        }
      />
      <CardContent>
        {!showFront && (
          <>
            <div>{card.flash_card_content.teaching_notes}</div>
            {card.flash_card_content.dictionary_form !==
              card.flash_card_content.japanese_example && (
              <>
                <br />
                <div>Root: {card.flash_card_content.dictionary_form}</div>
              </>
            )}
            <br />
            <div>
              <FuriganaText text={card.flash_card_content.example_sentence} />
            </div>
            <div>{card.flash_card_content.example_sentence_translation}</div>
          </>
        )}
      </CardContent>
      <CardActions>
        {showFront ? (
          <Button
            color="tertiaryDark"
            onClick={() => {
              setShowFront(false);
              setShowConfirm(false);
            }}
          >
            Reveal
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button
              color="tertiaryDark"
              onClick={() => handleSetRating(card.flash_card_id, "Again")}
            >
              Again
            </Button>
            <Button
              color="tertiaryDark"
              onClick={() => handleSetRating(card.flash_card_id, "Hard")}
            >
              Hard
            </Button>
            <Button
              color="tertiaryDark"
              onClick={() => handleSetRating(card.flash_card_id, "Good")}
            >
              Good
            </Button>
            <Button
              color="tertiaryDark"
              onClick={() => handleSetRating(card.flash_card_id, "Easy")}
            >
              Easy
            </Button>
          </Stack>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Collapse in={showConfirm} orientation="horizontal">
          <Button
            color="tertiaryDark"
            sx={{ height: "100%" }}
            onClick={handleConfirm(card.flash_card_id)}
          >
            Confirm
          </Button>
        </Collapse>
        <Button color="tertiaryDark" onClick={handleDelete(card.flash_card_id)}>
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default function FlashCardReview() {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const [showFront, setShowFront] = useState(true);
  const [flashCardCounts, setFlashCardCounts] = useState({});

  const loadFlashCards = async () => {
    const res = await fetchFlashCards("review");
    console.log(res);
    setCards(res);
    setCard(getRandomElement(res));
    setShowFront(true);
  };
  const loadFlashCardCounts = async () => {
    const res = await fetchFlashCardCounts();
    setFlashCardCounts({ DUE: res["DUE"], DONE: 0 });
  };

  useEffect(() => {
    loadFlashCards();
    loadFlashCardCounts();
  }, []);

  async function setRating(flashCardId, rating) {
    // TODO: show some transition
    await reviewFlashCard(flashCardId, rating);
    loadFlashCards();
    flashCardCounts["DONE"]++;
  }

  async function callDeleteFlashCard(flashCardId) {
    // TODO: show some transition
    await deleteFlashCard(flashCardId);
    loadFlashCards();
    flashCardCounts["DUE"]--;
  }

  return (
    <Container>
      {cards.length === 0 && <Box sx={{ p: 4 }}>No cards to review 😎</Box>}
      {card !== null && (
        <Box>
          <Box p={1} sx={{ textAlign: "right" }}>
            {flashCardCounts["DONE"]}/{flashCardCounts["DUE"]}
          </Box>
          <FlashCardFlipper
            card={card}
            showFront={showFront}
            setShowFront={setShowFront}
            setRating={setRating}
            callDeleteFlashCard={callDeleteFlashCard}
          />
        </Box>
      )}
    </Container>
  );
}

/*
export default function FlashCardStudy() {
  return <FlashCardList />;
}
*/
