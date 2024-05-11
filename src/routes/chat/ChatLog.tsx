export default function ChatLog({ messages }) {
  return (
    <div>
    This is the chatlog
    <ul>
      {messages.map((message, index) => (
        <li key={index}>{ message }</li>
      ))}

    </ul>
    </div>
  )
}
