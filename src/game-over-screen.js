export default (players, firstPlayerWin, onPlayAgain) => {
  const content = document.createElement("div");
  content.id = "game-over-screen";

  const youWinParagraph = document.createElement("p");
  content.appendChild(youWinParagraph);
  youWinParagraph.id = "you-win-paragraph";
  youWinParagraph.textContent = `Congratulations, ${players[firstPlayerWin ? 0 : 1].name}. You won!`;

  const youLoseParagraph = document.createElement("p");
  content.appendChild(youLoseParagraph);
  youLoseParagraph.id = "you-lose-paragraph";
  youLoseParagraph.textContent = `Sorry, ${players[firstPlayerWin ? 1 : 0].name}. You lose!`;

  const playAgainButton = document.createElement("button");
  content.appendChild(playAgainButton);
  playAgainButton.id = "play-again-button";
  playAgainButton.textContent = "Play Again!";

  playAgainButton.addEventListener("click", onPlayAgain);

  return content;
};
