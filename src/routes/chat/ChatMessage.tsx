import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { saveFlashCard } from "../../services/flashCardService";
import { marked } from "marked";
import DOMPurify from "dompurify";
import FuriganaText from "../../components/FuriganaText";

const flashCardLessonStyle = css({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

const flashCardPointStyle = css({
  borderBottom: "1px solid #ccc",
  padding: "5px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "baseline",
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

function SimpleChatMessage({ message }) {
  const formattedMessage = marked(message.message);
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);
  return (
    <div
      css={{ overflowY: "auto", textAlign: "left", padding: "0 10px" }}
      dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
    ></div>
  );
}

function FlashCardLessonChatMessage({ message, reloadMessages }) {
  const lesson = message.flash_card_lesson;
  const chatId = message.chat_id;
  const chatMessageId = message.chat_message_id;

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  async function bookmarkHandler(cardIndex, save) {
    const res = await saveFlashCard(chatId, chatMessageId, cardIndex, save);
    await reloadMessages();
  }

  const translationItems = [];

  let inputText = lesson.input_text;
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
          css={hoverIndex === index ? { color: "red" } : null}
          onMouseOver={() => setHoverIndex(index)}
          onMouseOut={() => setHoverIndex(null)}
        >
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
        {lesson.flash_cards.map((card, cardIndex) => (
          <div
            key={cardIndex}
            css={[
              css({
                backgroundColor:
                  hoverIndex === cardIndex ? "#333355" : "defaultColor",
              }),
              flashCardPointStyle,
            ]}
            onMouseOver={() => setHoverIndex(cardIndex)}
            onMouseOut={() => setHoverIndex(null)}
          >
            <div css={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <div
                css={{
                  flexGrow: 1,
                  flexBasis: 0,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                [{card.jlpt_level}]
              </div>
              <div css={{ flexGrow: 1, flexBasis: 0 }}>
                <FuriganaText text={card.japanese_example} />
              </div>
              <div
                css={{
                  flexGrow: 1,
                  flexBasis: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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
            <div css={{ width: "100%" }}>{card.teaching_notes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChatMessage({ message, reloadMessages }) {
  console.log(message);
  if (message === undefined || message === null) {
    return <></>;
  }
  return (
    <>
      {message.message_type === "message" && (
        <SimpleChatMessage message={message} />
      )}
      {message.message_type === "flash_card_lesson" && (
        <FlashCardLessonChatMessage
          message={message}
          reloadMessages={reloadMessages}
        />
      )}
    </>
  );
}
