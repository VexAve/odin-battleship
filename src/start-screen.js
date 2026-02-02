export default (players, onDone) => {
  const content = document.createElement("div");
  content.id = "start-screen";

  const battleshipHeading = document.createElement("h1");
  content.appendChild(battleshipHeading);
  battleshipHeading.textContent = "Battleship";

  const playerForms = document.createElement("div");
  content.appendChild(playerForms);
  playerForms.id = "player-forms";

  const loadPlayerForm = (playerIndex) => {
    const playerForm = document.createElement("div");
    playerForm.className = "player-form";

    const playerHeading = document.createElement("h2");
    playerForm.appendChild(playerHeading);
    playerHeading.textContent = `Player ${playerIndex + 1}`;

    const nameLabel = document.createElement("label");
    playerForm.appendChild(nameLabel);
    nameLabel.textContent = "Name:";
    nameLabel.htmlFor = "name-input";

    const nameInput = document.createElement("input");
    playerForm.appendChild(nameInput);
    nameInput.id = "name-input";
    nameInput.value = players[playerIndex].name;

    nameInput.addEventListener(
      "change",
      () => (players[playerIndex].name = nameInput.value),
    );

    const humanOrCpuLabel = document.createElement("label");
    playerForm.appendChild(humanOrCpuLabel);
    humanOrCpuLabel.textContent = "Human or CPU:";
    humanOrCpuLabel.htmlFor = "human-or-cpu-input";

    const humanOrCpuSelect = document.createElement("select");
    playerForm.appendChild(humanOrCpuSelect);
    humanOrCpuSelect.id = "human-or-cpu-input";
    humanOrCpuSelect.value = players[playerIndex].human ? "human" : "cpu";

    humanOrCpuSelect.addEventListener(
      "change",
      () => (players[playerIndex].human = humanOrCpuSelect.value === "human"),
    );

    const humanOption = document.createElement("option");
    humanOrCpuSelect.appendChild(humanOption);
    humanOption.textContent = "Human";
    humanOption.value = "human";

    const cpuOption = document.createElement("option");
    humanOrCpuSelect.appendChild(cpuOption);
    cpuOption.textContent = "CPU";
    cpuOption.value = "cpu";

    return playerForm;
  };

  playerForms.appendChild(loadPlayerForm(0));
  playerForms.appendChild(loadPlayerForm(1));

  const doneButton = document.createElement("button");
  content.appendChild(doneButton);
  doneButton.id = "done-button";
  doneButton.textContent = "Done!";

  doneButton.addEventListener("click", () => {
    players[0].name ||= "Player 1";
    players[1].name ||= "Player 2";
    onDone();
  });

  return content;
};
