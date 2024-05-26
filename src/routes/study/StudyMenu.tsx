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
    <Stack spacing={1} marginTop={1}>
      <LeftAlignedButton variant="contained" color="secondary" onClick={() => navigate("/study/new")}> New </LeftAlignedButton>
      <LeftAlignedButton  variant="contained" color="secondary" onClick={() => navigate("/study/review")}> Review </LeftAlignedButton>
    </Stack>
  );
}
