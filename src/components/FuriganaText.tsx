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

      const preKanjiSubstring = inputText.substring(0, kanjiBeginIndex)
      if (preKanjiSubstring.length > 0) {
        output.push(preKanjiSubstring);
      }
      output.push(
        <ruby>
          {inputText.substring(kanjiBeginIndex, kanjiEndIndex)}
          <rt>{match[1]}</rt>
        </ruby>,
      );
      inputText = inputText.substring(endIndex);
    } else {
      output.push(inputText);
      inputText = "";
    }
  }

  return output;
}

export default function FuriganaText({ text }) {
  return <div>{addRubyTags(text)}</div>;
}
