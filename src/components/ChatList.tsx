import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

import { deleteChat, fetchChatList, createChat } from "../services/chatService";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#666666",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
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
      <Button type="submit">Create Chat</Button>
    </form>
  );
};

const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const loadChats = async () => {
    const chatData = await fetchChatList();
    setChats(chatData);
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

  return (
    <Box>
      <ChatForm onNewChat={loadChats} />
      <Stack spacing={1}>
        {chats.map((chat, index) => (
          <Item
            key={index}
            elevation={2}
            onClick={() => navigate(`/chat/${chat.chat_id}`)}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Box>{chat.chat_name || "Untitled"}</Box>
              <Box>{chat.created_at}</Box>
            </Box>
            <Collapse in={showConfirm[chat.chat_id]} orientation="horizontal">
              <Button
                sx={{ height: "100%" }}
                onClick={handleConfirm(chat.chat_id)}
              >
                Confirm
              </Button>
            </Collapse>
            <Button onClick={handleDelete(chat.chat_id)}>
              <DeleteIcon />
            </Button>
          </Item>
        ))}
      </Stack>
    </Box>
  );
};

export default ChatList;
