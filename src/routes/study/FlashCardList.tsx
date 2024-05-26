import { useEffect, useState } from "react";
import {
  fetchFlashCards,
  reviewFlashCard,
} from "../../services/flashCardService";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import FuriganaText from "../../components/FuriganaText";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";

export default function FlashCardList() {
  const [cards, setCards] = useState([]);

  const loadFlashCards = async () => {
    const res = await fetchFlashCards("new");
    console.log(res);
    setCards(res);
  };

  useEffect(() => {
    loadFlashCards();
  }, []);

  async function addToReviewsHandler(flashCardId) {
    // TODO: show some transition
    await reviewFlashCard(flashCardId, "ADD_TO_REVIEW");
    loadFlashCards();
  }

  return (
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      <Stack>
        {cards.length === 0 && <Box> No cards to review 😎</Box>}
        {cards.map((card, idx) => (
          <Card key={idx} variant="outlined">
            <CardHeader
              title={
                <Stack direction="row">
                  <Button>
                    <RemoveCircleOutlineIcon />
                  </Button>
                  <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
                    <FuriganaText
                      text={card.flash_card_content.japanese_example}
                    />
                  </Box>
                  <Box>[{card.flash_card_content.jlpt_level}]</Box>
                  <Button
                    onClick={() => addToReviewsHandler(card.flash_card_id)}
                  >
                    <MoveToInboxIcon />
                  </Button>
                </Stack>
              }
            />
            <CardContent>
              {card.flash_card_content.dictionary_form !==
                card.flash_card_content.japanese_example && (
                <Stack direction="horizontal" sx={{ alignItems: "flex-end" }}>
                  Root:&nbsp;&nbsp;
                  <FuriganaText
                    text={card.flash_card_content.dictionary_form}
                  />
                </Stack>
              )}
              <div>{card.flash_card_content.teaching_notes}</div>
              <br />
              <div>{card.flash_card_content.input_text}</div>
              <div>{card.flash_card_content.translated_text}</div>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
