import { useContext } from "react";
import { css } from "@emotion/react";
import { FuriganaContext } from "../providers/FuriganaProvider";

function isKanji(character) {
  const kanjiRegex = /[\u4e00-\u9faf\u3400-\u4dbf]/;
  return kanjiRegex.test(character);
}

function addRubyTags(text) {
  if (text === null) {
    return text;
  }
  let inputText = text;
  let output = [];
  const regex = /\(([^)]+)\)/;

  let key = 0;
  while (inputText.length > 0) {
    const match = inputText.match(regex);

    if (match) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;

      let kanjiEndIndex = startIndex;
      let kanjiBeginIndex = startIndex - 1;
      while (kanjiBeginIndex >= 0 && isKanji(inputText[kanjiBeginIndex])) {
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

export function FuriganaToggleButton({showFurigana, toggleShowFurigana}) {
  return (
    <button onClick={toggleShowFurigana}>{showFurigana ? '字' : 'あ'}</button>
  )
}

export default function FuriganaText({ text }) {
  const { showFurigana } = useContext(FuriganaContext);

  const rubyStyle = css`
    rt {
      visibility: ${showFurigana ? "visible" : "hidden"};
    }
    &:hover rt {
      visibility: visible;
    }
  `;

  return <div css={rubyStyle}>{addRubyTags(text)}</div>;
}
