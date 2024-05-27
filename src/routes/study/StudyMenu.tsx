import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { fetchFlashCardCounts } from "../../services/flashCardService";

const LeftAlignedButton = styled(Button)({
  justifyContent: "flex-start",
});

export default function StudyMenu() {
  const navigate = useNavigate();
  const [flashCardCounts, setFlashCardCounts] = useState({});

  const loadFlashCardCounts = async () => {
    const res = await fetchFlashCardCounts();
    setFlashCardCounts(res);
  };

  useEffect(() => {
    loadFlashCardCounts();
  }, []);

  return (
    <Stack spacing={1} marginTop={1}>
      <LeftAlignedButton
        variant="contained"
        color="secondary"
        onClick={() => navigate("/study/new")}
      >
        New ({flashCardCounts["NEW"]})
      </LeftAlignedButton>
      <LeftAlignedButton
        variant="contained"
        color="secondary"
        onClick={() => navigate("/study/review")}
      >
        Review ({flashCardCounts["REVIEW"]})
      </LeftAlignedButton>
    </Stack>
  );
}
