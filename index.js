while (true) {
  const cardNumber = prompt("Enter the card number");
  new checkCardNumber(cardNumber);
  const answer = finishGame();
  if (answer) break;
}

function finishGame() {
  const answer = prompt(
    "Do you want to complete validation? Yes/No"
  ).toLowerCase();
  if (answer === "yes") {
    alert("Good Bye");
    return true;
  } else if (answer === "no") {
    return false;
  } else {
    alert("Correct the answer");
    return finishGame();
  }
}
