import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { saveFlashCard } from "../../services/flashCardService";

const flashCardPointStyle = css`
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  &:hover {
    background-color: #202020;
  }
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
const flashCardLessonStyle = css({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

const translationStyle = css({
  backgroundColor: "#333333",
  borderBottom: "1px solid #ccc",
  padding: "5px 0",
});

const bookmarkStyle = css`
  &:hover {
    color: blue;
  }
  margin-right: 5px;
`;

export default function FlashCardLesson(lesson, chatId, chatMessageId) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [localFlashCards, setLocalFlashCards] = useState(lesson.flash_cards);

  useEffect(() => {
    setLocalFlashCards(lesson.flash_cards);
  }, [lesson]);

  async function bookmarkHandler(cardIndex, save) {
    const res = await saveFlashCard(chatId, chatMessageId, cardIndex, save)
    const updatedFlashCards = localFlashCards.map((card, idx) =>
      idx === cardIndex ? { ...card, is_saved: res.save } : card,
    );
    setLocalFlashCards(updatedFlashCards);
  }

  const translationItems = [];

  let inputText = lesson.input_text;
  localFlashCards.forEach((card, index) => {
    const exampleText = card.japanese_example.replace(/\(.*?\)/g, ""); // remove (pronuncation)
    const startIndex = inputText.indexOf(exampleText);
    if (startIndex > -1) {
      if (startIndex > 0) {
        translationItems.push(inputText.substring(0, startIndex)); // unmatched characters to left
      }
      translationItems.push(
        <span key={index} css={hoverIndex === index ? { color: "red" } : null}>
          {inputText.substring(startIndex, startIndex + exampleText.length)}
        </span>,
      ); // matched substring
      inputText = inputText.substring(startIndex + exampleText.length);
    }
  });
  if (inputText.length > 0) {
    translationItems.push(inputText); // leftover input
  }

  return (
    <div css={flashCardLessonStyle}>
      <div css={translationStyle}>
        <div>{translationItems}</div>
        <div>{lesson.translated_text}</div>
      </div>
      <div css={{ overflowY: "auto" }}>
        {localFlashCards.map((card, cardIndex) => (
          <div
            key={cardIndex}
            css={flashCardPointStyle}
            onMouseOver={() => setHoverIndex(cardIndex)}
            onMouseOut={() => setHoverIndex(null)}
          >
            <div css={{ flexGrow: 1 }}>
              <div>{card.japanese_example}</div>
              <div>{card.teaching_notes}</div>
            </div>
            <div css={{ margin: "0 5px" }}>
              {card.is_saved ? (
                <BookmarkOutlinedIcon
                  css={bookmarkStyle}
                  onClick={() => bookmarkHandler(cardIndex, false)}
                />
              ) : (
                <BookmarkBorderOutlinedIcon
                  css={bookmarkStyle}
                  onClick={() => bookmarkHandler(cardIndex, true)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
