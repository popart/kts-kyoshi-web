import { useEffect, useState } from "react";
import {
  fetchFlashCards,
  reviewFlashCard,
} from "../../services/flashCardService";
import { css } from "@emotion/react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import FuriganaText from "../../components/FuriganaText";

const buttonStyle = css({
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

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
    <div>
      {cards.length === 0 && <div> No cards to review 😎</div>}
      {cards.map((card, idx) => (
        <div key={idx}>
          <div
            key={idx}
            css={{
              backgroundColor: "indianRed",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "9px",
            }}
          >
            <div
              css={{
                flexGrow: 1,
                flexBasis: 0,
                display: "flex",
                flexDirection: "col",
                alignItems: "center",
              }}
            >
              <button css={buttonStyle}>
                <RemoveCircleOutlineIcon />
              </button>
              <span>[{card.flash_card_content.jlpt_level}]</span>
            </div>
            <div css={{ flexGrow: 1, flexBasis: 0 }}>
              <FuriganaText text={card.flash_card_content.japanese_example} />
            </div>
            <div css={{ flexGrow: 1, flexBasis: 0, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                css={buttonStyle}
                onClick={() => addToReviewsHandler(card.flash_card_id)}
              >
                <MoveToInboxIcon />
              </button>
            </div>
          </div>
          <div>
            {card.flash_card_content.dictionary_form !==
              card.flash_card_content.japanese_example && (
              <div>{card.flash_card_content.dictionary_form}</div>
            )}
            <div>{card.flash_card_content.teaching_notes}</div>
            <br />
            <div>{card.flash_card_content.input_text}</div>
            <div>{card.flash_card_content.translated_text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
