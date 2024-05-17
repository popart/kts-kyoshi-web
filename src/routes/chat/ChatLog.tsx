import { useState } from "react";
import { css } from "@emotion/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Message(message) {
  return <div>{message}</div>;
}

function FlashCardLesson(lesson) {
  return (
    <div>
      <b>{lesson.input_text}</b>
      <br />
      {lesson.translated_text}
      <br />
      <ul>
        {lesson.flash_cards.map((card, cardIndex) => (
          <li key={cardIndex}>
            <ul>
              <li>{card.japanese_example}</li>
              <li>{card.teaching_notes}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderMessage(message) {
  //console.log("rendering");
  //console.log(message);
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
  console.log(messages);
  const [messageIndex, setMessageIndex] = useState(messages.length - 1);

  function incMessageIndex(inc: number) {
    let newIndex = messageIndex + inc;
    newIndex = Math.max(1, newIndex);
    newIndex = Math.min(messages.length - 1, newIndex);
    setMessageIndex(newIndex);
  }
  return (
    <div>
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
