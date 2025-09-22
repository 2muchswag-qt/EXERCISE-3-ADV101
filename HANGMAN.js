function runGame(word, maxAttempts, hint) {
  let attemptsLeft = maxAttempts;
  let progress = "_".repeat(word.length).split(""); // hide word initially
  let guessedLetters = [];

  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function showProgress() {
    console.log("\nWord: " + progress.join(" "));
    console.log("Attempts left: " + attemptsLeft);
    console.log("Guessed letters: " + guessedLetters.join(", "));
  }

  function askGuess() {
    if (attemptsLeft <= 0) {
      console.log(`❌ Game over! The word was: ${word}`);
      readline.close();
      return;
    }

    showProgress();

    readline.question("Enter your guess: ", (guess) => {
      guess = guess.toUpperCase();


      if (guess === word) {
        console.log(`🎉 Congratulations! You guessed the word: ${word}`);
        readline.close();
        return;
      }

    
      if (guess.length === 1) {
        if (guessedLetters.includes(guess)) {
          console.log("⚠️ You already guessed that letter!");
        } else {
          guessedLetters.push(guess);

          if (word.includes(guess)) {
            console.log("✅ Good guess!");
            // Reveal letters
            for (let i = 0; i < word.length; i++) {
              if (word[i] === guess) {
                progress[i] = guess;
              }
            }
           
            if (!progress.includes("_")) {
              console.log(`🎉 Congratulations! You guessed the word: ${word}`);
              readline.close();
              return;
            }
          } else {
            attemptsLeft--;
            console.log("❌ Wrong guess!");
            if (attemptsLeft === 1) {
              console.log("💡 Hint: " + hint);
            }
          }
        }
      } else {
        console.log("⚠️ Please guess a single letter or the whole word.");
      }

      askGuess(); // continue loop
    });
  }

  console.log("🔤 Welcome to Hangman!");
  askGuess();
}


runGame("HANGMAN", 6, "It's a classic word guessing game.");
