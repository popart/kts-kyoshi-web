import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

const LeftAlignedButton = styled(Button)({
  justifyContent: 'flex-start',
})

export default function StudyMenu() {
    const navigate = useNavigate();

  return (
    <Stack>
      <LeftAlignedButton  onClick={() => navigate("/study/new")}> New </LeftAlignedButton>
      <LeftAlignedButton onClick={() => navigate("/study/review")}> Review </LeftAlignedButton>
    </Stack>
  );
}
