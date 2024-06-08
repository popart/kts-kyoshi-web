import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";

import {
  deleteChat,
  fetchChatList,
  createChat,
  updateChat,
} from "../services/chatService";
import { TextField } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),

  textAlign: "left",
  cursor: "pointer",
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.dark,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "0px 4px 8px rgba(0,0,0,.2)",
  },
  display: "flex",
  flexDirection: "row",
}));

interface ChatFormProps {
  onNewChat: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onNewChat }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createChat(); // You'll need to implement this function
    onNewChat();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button color="primary" variant="contained" type="submit">
        New Chat
      </Button>
    </form>
  );
};

const ChatList: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [editChat, setEditChat] = useState<{ [key: string]: boolean }>({});
  const [editChatNames, setEditChatNames] = useState<{ [key: string]: string }>(
    {},
  );

  const loadChats = async () => {
    const chatData = await fetchChatList();
    setChats(chatData);
    setEditChat(
      chatData.reduce((acc, currentChat) => {
        acc[currentChat.chat_id] = false;
        return acc;
      }, {}),
    );
    setEditChatNames(
      chatData.reduce((acc, currentChat) => {
        acc[currentChat.chat_id] = currentChat.chat_name || "Untitled";
        return acc;
      }, {}),
    );
  };
  useEffect(() => {
    loadChats();
  }, []);

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
  const handleConfirm = (chatId: string) => {
    return async (event) => {
      event.stopPropagation();
      await deleteChat(chatId);
      await loadChats();
    };
  };

  const handleEditChat = (chatId: string) => {
    return async (event) => {
      event.stopPropagation();
      const currentEditChat = editChat[chatId];
      if (!currentEditChat) {
        setEditChat((prev) => {
          return {
            ...prev,
            [chatId]: !currentEditChat,
          };
        });
      } else {
        await updateChat(chatId, editChatNames[chatId]);
        loadChats();
      }
    };
  };
  const handleChatChange = (chatId: string) => {
    return async (event) => {
      setEditChatNames((prev) => {
        return {
          ...prev,
          [chatId]: event.target.value,
        };
      });
    };
  };
  const handleClickChatItem = (chatId: string) => {
    return async () => {
      if (editChat[chatId]) {
        await updateChat(chatId, editChatNames[chatId]);
        loadChats();
      } else {
        navigate(`/chat/${chatId}`);
      }
    };
  };

  return (
    <Box>
      <Box marginTop={1} marginBottom={1}>
        <ChatForm onNewChat={loadChats} />
      </Box>
      <Stack spacing={1}>
        {chats.map((chat, index) => (
          <Item key={index} onClick={handleClickChatItem(chat.chat_id)}>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" sx={{ alignItems: "center" }}>
                <Typography component="div">
                  {editChat[chat.chat_id] ? (
                    <TextField
                      onClick={(e) => e.stopPropagation()}
                      onChange={handleChatChange(chat.chat_id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditChat(chat.chat_id)(e);
                        }
                      }}
                      value={
                        editChatNames[chat.chat_id] === null
                          ? "Untitled"
                          : editChatNames[chat.chat_id]
                      }
                    />
                  ) : (
                    chat.chat_name || "Untitled"
                  )}
                </Typography>
                <Button
                  color="tertiaryDark"
                  onClick={handleEditChat(chat.chat_id)}
                >
                  {editChat[chat.chat_id] ? <SaveIcon /> : <EditNoteIcon />}
                </Button>
              </Stack>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {chat.created_at}
              </Typography>
            </Box>
            <Collapse in={showConfirm[chat.chat_id]} orientation="horizontal">
              <Button
                color="tertiaryDark"
                sx={{ height: "100%" }}
                onClick={handleConfirm(chat.chat_id)}
              >
                Confirm
              </Button>
            </Collapse>
            <Button color="tertiaryDark" onClick={handleDelete(chat.chat_id)}>
              <DeleteIcon />
            </Button>
          </Item>
        ))}
      </Stack>
    </Box>
  );
};

export default ChatList;
