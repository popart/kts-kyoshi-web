import { useState } from "react";
import { css } from "@emotion/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Message(message) {
  return <div>{message}</div>;
}

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
  borderTop: "1px solid #ccc",
  borderBottom: "1px solid #ccc",
  padding: "5px 0",
});

function FlashCardLesson(lesson) {
  const translationItems = [];
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  let inputText = lesson.input_text;
  let lastIndex = 0;
  lesson.flash_cards.forEach((card, index) => {
    const exampleText = card.japanese_example.replace(/\(.*?\)/g, "");
    const startIndex = inputText.indexOf(exampleText);
    if (startIndex > -1) {
      if (startIndex > 0) {
        translationItems.push(inputText.substring(0, startIndex)); // unmatched characters to left
      }
      translationItems.push(
        <span css={{ color: hoverIndex === index ? "red" : "white" }}>
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

function renderMessage(message) {
  switch (message.message_type) {
    case "message":
      return Message(message.message);
    case "flash_card_lesson":
      return FlashCardLesson(message.flash_card_lesson);
    default:
      return <div>Unexpected Response Type</div>;
  }
}

const arrowIconStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  backgroundColor: "#1a1a1a",
  borderRadius: "4px",
});

export default function ChatLog({ messages, inputFormData }) {
  const [messageIndex, setMessageIndex] = useState(messages.length - 1);

  function incMessageIndex(inc: number) {
    let newIndex = messageIndex + inc;
    newIndex = Math.max(1, newIndex);
    newIndex = Math.min(messages.length - 1, newIndex);
    setMessageIndex(newIndex);
  }
  return (
    <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button css={arrowIconStyle} onClick={() => incMessageIndex(-2)}>
          <ArrowBackIosNewIcon />
        </button>
        {renderMessage(messages[messageIndex - 1])}
        <button css={arrowIconStyle} onClick={() => incMessageIndex(2)}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      {renderMessage(messages[messageIndex])}
    </div>
  );
}

/**
      <br />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{renderMessage(message)}</li>
        ))}
        {inputFormData ? <li>{inputFormData.get("message")}</li> : null}
      </ul>

**/
