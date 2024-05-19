import { useState } from "react";
import { css } from "@emotion/react";

const flashCardPointStyle = css`
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  &:hover {
    background-color: #202020;
  }
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

export default function FlashCardLesson(lesson) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const translationItems = [];

  let inputText = lesson.input_text;
  let lastIndex = 0;
  lesson.flash_cards.forEach((card, index) => {
    const exampleText = card.japanese_example.replace(/\(.*?\)/g, ""); // remove (pronuncation)
    const startIndex = inputText.indexOf(exampleText);
    if (startIndex > -1) {
      if (startIndex > 0) {
        translationItems.push(inputText.substring(0, startIndex)); // unmatched characters to left
      }
      translationItems.push(
        <span
          key={index}
          css={{ color: hoverIndex === index ? "red" : "white" }}
        >
          {inputText.substring(startIndex, startIndex + exampleText.length)}
        </span>,
      ); // matched substring
      inputText = inputText.substring(startIndex + exampleText.length);
      lastIndex = startIndex + exampleText.length;
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
        {lesson.flash_cards.map((card, cardIndex) => (
          <div
            key={cardIndex}
            css={flashCardPointStyle}
            onMouseOver={() => setHoverIndex(cardIndex)}
            onMouseOut={() => setHoverIndex(null)}
          >
            <div>{card.japanese_example}</div>
            <div>{card.teaching_notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
