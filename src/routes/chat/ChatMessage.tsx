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
  Collapse,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const flashCardLessonStyle = css({
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

function SimpleChatMessage({ message }) {
  const formattedMessage = marked(message.message);
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);
  const outText = (
    <Typography
      dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
    ></Typography>
  );
  return (
    <Card sx={{ overflowY: "auto", textAlign: "left", padding: "0 10px" }}>
      <CardContent>{outText}</CardContent>
    </Card>
  );
}

function FlashCardLessonChatMessage({ message, reloadMessages }) {
  const theme = useTheme();

  const lesson = message.flash_card_lesson;
  const chatId = message.chat_id;
  const chatMessageId = message.chat_message_id;
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showTutorResponse, setShowTutorResponse] = useState<boolean>(false);

  async function cardActionHandler(cardIndex: number) {
    const is_saved = lesson.flash_cards[cardIndex].is_saved;
    await saveFlashCard(chatId, chatMessageId, cardIndex, !is_saved);
    await reloadMessages();
  }

  const translationItems = [];

  let exampleSentence = lesson.example_sentence;
  lesson.flash_cards.forEach((card, index) => {
    const exampleText = card.japanese_example; // remove (pronuncation)
    const startIndex = exampleSentence.indexOf(exampleText);
    if (startIndex > -1) {
      if (startIndex > 0) {
        translationItems.push(exampleSentence.substring(0, startIndex)); // unmatched characters to left
      }
      translationItems.push(
        <Box
          key={index}
          css={hoverIndex === index ? { color: theme.palette.pop.main } : null}
          onMouseOver={() => setHoverIndex(index)}
          onMouseOut={() => setHoverIndex(null)}
        >
          <FuriganaText
            text={exampleSentence.substring(
              startIndex,
              startIndex + exampleText.length,
            )}
          />
        </Box>,
      ); // matched substring
      exampleSentence = exampleSentence.substring(
        startIndex + exampleText.length,
      );
    }
  });
  if (exampleSentence.length > 0) {
    translationItems.push(exampleSentence); // leftover input
  }

  const formattedMessage = marked(lesson.tutor_response);
  const sanitizedMessage = DOMPurify.sanitize(formattedMessage);

  return (
    <Box css={flashCardLessonStyle}>
      <Stack
        onClick={() => setShowTutorResponse((prev) => !prev)}
        sx={{ cursor: "pointer" }}
        padding={1}
      >
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderBottomLeftRadius: showTutorResponse ? 0 : null,
            borderBottomRightRadius: showTutorResponse ? 0 : null,
            border: 1,
          }}
        >
          <Typography component="div">
            <Stack
              direction="row"
              sx={{ alignItems: "flex-end", flexWrap: "wrap" }}
            >
              {translationItems}
            </Stack>
          </Typography>
          <Stack direction="row">
            <Typography sx={{ flexGrow: 1 }}>
              {lesson.example_sentence_translation}
            </Typography>
            <Stack direction="column" alignContent="flex-end">
              <Box sx={{ flexGrow: 1 }} />
              {showTutorResponse ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
            </Stack>
          </Stack>
        </Paper>
        <Collapse
          in={showTutorResponse}
          orientation="vertical"
          sx={{ zIndex: -1, position: "relative" }}
        >
          <Paper
            sx={{
              p: 2,
              backgroundColor: theme.palette.secondary.dark,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            dangerouslySetInnerHTML={{ __html: sanitizedMessage }}
          ></Paper>
        </Collapse>
      </Stack>

      <Stack spacing={1} sx={{ overflowY: "auto" }} padding={1}>
        {lesson.flash_cards.map((card, cardIndex) => (
          <Card
            key={cardIndex}
            onMouseOver={() => setHoverIndex(cardIndex)}
            onMouseOut={() => setHoverIndex(null)}
          >
            <CardActionArea
              onClick={() => cardActionHandler(cardIndex)}
              css={{
                backgroundColor:
                  hoverIndex === cardIndex
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.dark,
              }}
            >
              <CardHeader
                sx={{ width: "100%" }}
                title={
                  <Stack direction="row">
                    <Box sx={{ flexGrow: 1, borderBottom: "1px solid" }}>
                      <FuriganaText text={card.japanese_example} />
                    </Box>
                    <Box sx={{ borderBottom: "1px solid" }}>
                      [{card.jlpt_level}]
                    </Box>
                    {card.is_saved ? (
                      <Tooltip title="Card is saved">
                        <Box paddingLeft={1}>
                          <BookmarkOutlinedIcon />
                        </Box>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Add to Reviews">
                        <Box paddingLeft={1}>
                          <BookmarkBorderOutlinedIcon />
                        </Box>
                      </Tooltip>
                    )}
                  </Stack>
                }
              />
              <CardContent>{card.teaching_notes}</CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default function ChatMessage({ message, reloadMessages }) {
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
