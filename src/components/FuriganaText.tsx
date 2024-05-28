import { useContext } from "react";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";

import { FuriganaContext } from "../providers/FuriganaProvider";
import { Box } from "@mui/material";

function isKanji(character: string) {
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
  return kanjiRegex.test(character);
}

function addRubyTags(text: string) {
  if (text === null) {
    return text;
  }
  let inputText = text;
  const output = [];
  const regex = /\(([^)]+)\)/;

  let key = 0;
  while (inputText.length > 0) {
    const match = inputText.match(regex);

    if (match) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      const kanjiEndIndex = startIndex;
      let kanjiBeginIndex = startIndex;
      while (kanjiBeginIndex >= 1 && isKanji(inputText[kanjiBeginIndex - 1])) {
        kanjiBeginIndex--;
      }

      const preKanjiSubstring = inputText.substring(0, kanjiBeginIndex);
      if (preKanjiSubstring.length > 0) {
        output.push(preKanjiSubstring);
      }
      output.push(
        <ruby key={key}>
          {inputText.substring(kanjiBeginIndex, kanjiEndIndex)}
          <rt>{match[1]}</rt>
        </ruby>,
      );
      inputText = inputText.substring(endIndex);
      key++;
    } else {
      output.push(inputText);
      inputText = "";
    }
  }

  return output;
}

export function FuriganaToggleButton({ showFurigana, toggleShowFurigana }) {
  return (
    <Button onClick={toggleShowFurigana} color="tertiary">
      {showFurigana ? "あ" : "字"}
    </Button>
  );
}

export default function FuriganaText({ text }) {
  const { showFurigana } = useContext(FuriganaContext);

  const rubyStyle = css`
    display: inline-block;
    rt {
      visibility: ${showFurigana ? "visible" : "hidden"};
    }
    &:hover rt {
      visibility: visible;
    }
  `;

  return <Box css={rubyStyle}>{addRubyTags(text)}</Box>;
}
