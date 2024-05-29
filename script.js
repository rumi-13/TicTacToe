// Select all elements with the class 'box'
let boxes = document.querySelectorAll(".box");
// Select the reset button by its ID
let resetBtn = document.querySelector("#reset-btn");
// Select the element that will display the winner
let winnerScript = document.getElementById("winner-box");

// Initialize playerX to true, indicating it's player X's turn
let playerX = true;

// Define the possible winning patterns for the tic-tac-toe game
const winningPatterns = [
    [0, 1, 2], // Top row
    [0, 3, 6], // Left column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [2, 4, 6], // Diagonal from top-right to bottom-left
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
];

// Add a click event listener to each box
boxes.forEach((box, count) => {
    box.addEventListener("click", () => {
        // If it's player X's turn
        if (playerX) {
            box.innerText = "X"; // Set the box's text to 'X'
            box.style.color = "#590d22"; // Set the text color to green
            playerX = false; // Switch to player O's turn
        } else {
            // If it's player O's turn
            box.innerText = "O"; // Set the box's text to 'O'
            box.style.color = "#006466"; // Set the text color to red
            playerX = true; // Switch to player X's turn
        }

        box.disabled = true; // Disable the box to prevent further clicks
        checkWinner(); // Check if there's a winner or a draw
    });
});

// Function to display the winner or draw message
const showWinner = (winner) => {
    if (winner) {
        winnerScript.innerText = `Congrats🎉! Winner is ${winner}`; // Show the winner message
    } else {
        winnerScript.innerText = "It's a draw!"; // Show the draw message
    }
    winnerScript.style.display = 'block'; // Display the winner element
    // Disable all boxes to prevent further play
    boxes.forEach(element => {
        element.disabled = true;
    });
}

// Function to check if there's a winner or a draw
const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winningPatterns) {
        // Get the values of the three boxes in the current pattern
        let box1val = boxes[pattern[0]].innerText;
        let box2val = boxes[pattern[1]].innerText;
        let box3val = boxes[pattern[2]].innerText;

        // Check if all three boxes are non-empty and have the same value
        if (box1val != "" && box2val != "" && box3val != "") {
            if (box1val === box2val && box2val === box3val) {
                showWinner(box1val); // Call showWinner with the value of the winning boxes
                winnerFound = true;
                break;
            }
        }
    }

    // Check for a draw if no winner is found
    if (!winnerFound) {
        let allBoxesFilled = true;
        boxes.forEach(box => {
            if (box.innerText === "") {
                allBoxesFilled = false;
            }
        });
        if (allBoxesFilled) {
            showWinner(null); // Call showWinner with null to indicate a draw
        }
    }
}

// Add a click event listener to the reset button
resetBtn.addEventListener("click", () => {
    resetGame(); // Call resetGame to reset the game
});

// Function to reset the game
const resetGame = () => {
    winnerScript.style.display = 'none'; // Hide the winner message
    // Enable all boxes and clear their text
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
