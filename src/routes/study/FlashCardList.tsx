import { useEffect, useState } from "react";
import {
  fetchFlashCards,
  reviewFlashCard,
} from "../../services/flashCardService";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/Delete";
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

import { deleteFlashCard } from "../../services/flashCardService";

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

  async function addToReviewsHandler(flashCardId: string) {
    // TODO: show some transition
    await reviewFlashCard(flashCardId, "ADD_TO_REVIEW");
    loadFlashCards();
  }

  const [showConfirm, setShowConfirm] = useState<{ [key: string]: boolean }>(
    {},
  );
  const handleDelete = (chatId: string) => {
    const currentShowConfirm = showConfirm[chatId] || false;
    return (event) => {
      event.stopPropagation();
      setShowConfirm((prev) => {
        return {
          ...prev,
          [chatId]: !currentShowConfirm,
        };
      });
    };
  };
  const handleConfirm = (flashCardId: string) => {
    return async (event) => {
      event.stopPropagation();
      await deleteFlashCard(flashCardId);
      await loadFlashCards();
    };
  };

  return (
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      <Stack>
        {cards.length === 0 && <Box> No cards to review 😎</Box>}
        {cards.map((card, idx) => (
          <Card key={idx} variant="outlined">
            <CardHeader
              title={
                <Stack direction="row">
                  <Box sx={{ flexGrow: 1, flexBasis: 0, borderBottom: "1px solid" }}>
                    <FuriganaText
                      text={card.flash_card_content.japanese_example}
                    />
                  </Box>
                  <Box sx={{borderBottom: "1px solid"}}>[{card.flash_card_content.jlpt_level}]</Box>
                  <Collapse in={showConfirm[card.flash_card_id]} orientation="horizontal">
                    <Button
                      sx={{ height: "100%" }}
                      onClick={handleConfirm(card.flash_card_id)}
                    >
                      Confirm
                    </Button>
                  </Collapse>
                  <Button onClick={handleDelete(card.flash_card_id)}>
                    <DeleteIcon />
                  </Button>
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
