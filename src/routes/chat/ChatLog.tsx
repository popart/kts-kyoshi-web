export default function ChatLog({ messages, inputFormData }) {
  return (
    <div>
    This is the chatlog
    <ul>
      {
        messages.map((message, index) => (
          <li key={index}>{ message.chatId }: { message.message }</li>
        ))
      }
      { inputFormData ?  (<li>{inputFormData.get("inputMessage")}</li>) : null }
    </ul>
    </div>
  )
}
