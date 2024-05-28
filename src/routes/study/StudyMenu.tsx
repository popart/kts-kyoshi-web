import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { fetchFlashCardCounts } from "../../services/flashCardService";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  useTheme,
} from "@mui/material";

const LeftAlignedButton = styled(Button)({
  justifyContent: "flex-start",
});

export default function StudyMenu() {
  const theme = useTheme();
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
    <Stack spacing={1} marginTop={1} direction="row">
      <Card sx={{ flex: 1 }}>
        <CardActionArea onClick={() => navigate("/study/new")}>
          <CardHeader title="NEW" />
          <CardContent sx={{ color: theme.palette.text.secondary }}>
            <b>{flashCardCounts["NEW"]}</b> cards waiting to be added to
            reviews.
            <br />
            <br />
          </CardContent>
        </CardActionArea>
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardActionArea onClick={() => navigate("/study/review")}>
          <CardHeader title="REVIEW" />
          <CardContent sx={{ color: theme.palette.text.secondary }}>
            <b>{flashCardCounts["DUE"]}</b> cards due for review.
            <br />
            <b>{flashCardCounts["REVIEW"]}</b> cards total in deck.
          </CardContent>
        </CardActionArea>
      </Card>
    </Stack>
  );
}
