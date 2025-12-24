const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newBtn = document.querySelector("#new-btn");
const msgBox = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const status = document.querySelector("#status");

let turn = "O";
let moves = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

status.innerText = "Turn: O";

// click on box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    box.innerText = turn;

if (turn === "X") {
  box.classList.add("x");
} else {
  box.classList.add("o");
}

    box.disabled = true;
    moves++;

    if (checkWinner()) {
      msg.innerText = `${turn} Wins 🎉`;
      msgBox.classList.remove("hide");
      disableAll();
      return;
    }

    if (moves === 9) {
      msg.innerText = "Game Draw 🤝";
      msgBox.classList.remove("hide");
      return;
    }

    turn = turn === "O" ? "X" : "O";
    status.innerText = `Turn: ${turn}`;
  });
});

// check winner
function checkWinner() {
  for (let p of winPatterns) {
    let a = boxes[p[0]].innerText;
    let b = boxes[p[1]].innerText;
    let c = boxes[p[2]].innerText;

    if (a && a === b && b === c) {
      return true;
    }
  }
  return false;
}

// disable all boxes
function disableAll() {
  boxes.forEach(box => box.disabled = true);
}

// reset game
function resetGame() {
  turn = "O";
  moves = 0;
  status.innerText = "Turn: O";
  msgBox.classList.add("hide");

  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
