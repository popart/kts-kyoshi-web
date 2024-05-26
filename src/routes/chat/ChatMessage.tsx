import { useState } from "react";
import { css } from "@emotion/react";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { saveFlashCard } from "../../services/flashCardService";
import { marked } from "marked";
import DOMPurify from "dompurify";
import FuriganaText from "../../components/FuriganaText";
import Card from "@mui/material/Card";
import {
  Box,
  CardActionArea,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const flashCardLessonStyle = css({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

function SimpleChatMessage({ message }) {
  const formattedMessage = marked(message.message);
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage)
  const outText = (
    <Typography
      dangerouslySetInnerHTML={{ __html: sanitizedMessage}}>
    </Typography>
  );
  return (
    <Card
      sx={{ overflowY: "auto", textAlign: "left", padding: "0 10px" }}
    >
    <CardContent>
    {outText}
    </CardContent>
    </Card>
  );
}

function FlashCardLessonChatMessage({ message, reloadMessages }) {
  const theme = useTheme();

  const lesson = message.flash_card_lesson;
  const chatId = message.chat_id;
  const chatMessageId = message.chat_message_id;
const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  async function cardActionHandler(cardIndex: number) {
    const is_saved = lesson.flash_cards[cardIndex].is_saved;
    await saveFlashCard(chatId, chatMessageId, cardIndex, !is_saved);
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
    <Box css={flashCardLessonStyle}>
      <Paper sx={{p:2}}>
          <Typography>{translationItems}</Typography>
          <Typography>{lesson.translated_text}</Typography>
      </Paper>
      <Box css={{ overflowY: "auto" }}>
        {lesson.flash_cards.map((card, cardIndex) => (
          <Card
            key={cardIndex}
            onMouseOver={() => setHoverIndex(cardIndex)}
            onMouseOut={() => setHoverIndex(null)}
          >
            <CardActionArea
              onClick={() => cardActionHandler(cardIndex)}
              css={{ backgroundColor: hoverIndex === cardIndex ? theme.palette.secondary.main : theme.palette.secondary.dark }}
            >
              <CardHeader
                sx={{ width: "100%" }}
                title={
                  <Stack direction="row">
                    <Box sx={{ flexGrow: 1 }}>
                      <FuriganaText text={card.japanese_example} />
                    </Box>
                    <Box>[{card.jlpt_level}]</Box>
                    {card.is_saved ? (
                      <Box width="60px"><BookmarkOutlinedIcon /></Box>
                    ) : (
                      <Box width="60px"><BookmarkBorderOutlinedIcon /></Box>
                    )}
                  </Stack>
                }
              />
              <CardContent>{card.teaching_notes}</CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
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
