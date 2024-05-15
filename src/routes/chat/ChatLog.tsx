function Message(message) {
  return <div>{message}</div>;
}

function FlashCardLesson(lesson) {
  return (
    <div>
      <b>{lesson.input_text}</b>
      <br />
      {lesson.translated_text}
      <br />
      <ul>
        {lesson.flash_cards.map((card, index) => (
          <li key="{index}">
            <ul>
              <li>{card.japanese_example}</li>
              <li>{card.teaching_notes}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

function renderMessage(message) {
  console.log("rendering");
  console.log(message);
  switch (message.message_type) {
    case "message":
      return Message(message.message);
    case "flash_card_lesson":
      return FlashCardLesson(message.flash_card_lesson);
    default:
      return <div>Unexpected Response Type</div>;
  }
}

export default function ChatLog({ messages, inputFormData }) {
  return (
    <div>
      This is the chatlog
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{renderMessage(message)}</li>
        ))}
        {inputFormData ? <li>{inputFormData.get("message")}</li> : null}
      </ul>
    </div>
  );
}
