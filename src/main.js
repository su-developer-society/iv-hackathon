/**
 * main.js
 * --------------------------------------
 * Frontend logic for Living Flashcards.
 * 
 * Responsibilities:
 * 1. Capture user input (topics/questions).
 * 2. Communicate securely with the backend API (/api/generate).
 * 3. Render AI-generated flashcards with Markdown + LaTeX support.
 * 4. Provide user experience enhancements (dark mode, copy-to-clipboard, quiz mode).
 * --------------------------------------
 */

// === INITIAL SETUP ===
// Ensure the DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // Initial status message
  updateStatus("Ready to generate your first flashcard! Enter a topic above.");
});

const topicInput = document.getElementById("topicInput");
const generateBtn = document.getElementById("generateBtn");
const quizBtn = document.getElementById("quizBtn");
const darkModeBtn = document.getElementById("darkModeBtn");
const flashcardContainer = document.getElementById("flashcardContainer");
const flashcardContent = document.getElementById("flashcardContent");
const copyBtn = document.getElementById("copyBtn");
const statusDiv = document.getElementById("status");

// === EVENT LISTENERS ===
generateBtn.addEventListener("click", () => handleFlashcardRequest(false));
quizBtn.addEventListener("click", () => handleFlashcardRequest(true));
darkModeBtn.addEventListener("click", toggleDarkMode);
copyBtn.addEventListener("click", copyFlashcardToClipboard);

/**
 * Handles a flashcard request from the user.
 * @param {boolean} quizMode - Determines whether the AI should quiz the user instead of directly showing the answer.
 */
async function handleFlashcardRequest(quizMode) {
  const topic = topicInput.value.trim();

  if (!topic) {
    updateStatus(
      "Please enter a valid topic. For example: 'Derivative of sin(x)' or 'Explain the chain rule in calculus.'"
    );
    return;
  }

  updateStatus("Generating flashcard... please wait.");

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, quizMode })
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();
    if (data.flashcard) {
      renderFlashcard(data.flashcard, quizMode);
      updateStatus("Flashcard successfully generated.");
    } else {
      throw new Error(data.error || "No flashcard was returned by the server.");
    }
  } catch (err) {
    console.error("Flashcard generation failed:", err);
    updateStatus(
      "An unexpected error occurred while generating your flashcard. Please retry or check logs for more detail."
    );
  }
}

/**
 * @param {string} content - The raw flashcard text from the AI.
 * @param {boolean} quizMode - If true, the back of the flashcard will be hidden until user interaction.
 */

function renderFlashcard(content, quizMode) {
  let htmlContent = marked.parse(content);

  if (quizMode) {
    htmlContent = htmlContent.replace(
      /(Back:|Answer:)([\s\S]*)/i,
      `<details><summary><strong>Reveal Answer</strong></summary>$2</details>`
    );
  }

  flashcardContent.innerHTML = htmlContent;

  // Typeset equations using MathJax
  if (window.MathJax) {
    window.MathJax.typesetPromise();
  }
}

/**
 * Copies the flashcard content to clipboard.
 */
function copyFlashcardToClipboard() {
  const text = flashcardContent.innerText;
  if (!text) {
    updateStatus(
      "There is no flashcard to copy. Please generate one before attempting this action."
    );
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => updateStatus("Flashcard successfully copied to clipboard."))
    .catch(() =>
      updateStatus(
        "Failed to copy flashcard content. Please try again or use manual copy (Ctrl+C / Cmd+C)."
      )
    );
}

/**
 * Toggles between dark mode and light mode.
 */

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  updateStatus(isDark ? " Dark mode activated." : "Light mode activated.");
}

/**
 * Updates the status section with a message.
 * @param {string} message - The message to display.
 */
function updateStatus(message) {
  statusDiv.textContent = message;
}
