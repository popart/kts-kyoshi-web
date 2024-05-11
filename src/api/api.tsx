export async function postChat(chatMessage) {
  await fakeNetwork();
  console.log("posted a chat message to API");
  let responseMessage = { message: "Echo echo echo..." };
  return responseMessage;
}

async function fakeNetwork() {
  return new Promise(res => {
    setTimeout(res, 500);
  });
}
