export default (players, firstPlayerTurn, onDone) => {
  const content = document.createElement("div");
  content.id = "next-turn-screen";

  const yourTurnParagraph = document.createElement("p");
  content.appendChild(yourTurnParagraph);
  yourTurnParagraph.id = "your-turn-paragraph";
  yourTurnParagraph.textContent = `${players[firstPlayerTurn ? 0 : 1].name}, it's your turn!`;

  const noPeekingParagraph = document.createElement("p");
  content.appendChild(noPeekingParagraph);
  yourTurnParagraph.id = "no-peeking-paragraph";
  noPeekingParagraph.textContent = `${players[firstPlayerTurn ? 1 : 0].name}, no peeking!`;

  const doneButton = document.createElement("button");
  content.appendChild(doneButton);
  doneButton.id = "done-button";
  doneButton.textContent = "Done!";

  doneButton.addEventListener("click", onDone);

  return content;
};
