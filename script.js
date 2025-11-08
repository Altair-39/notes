// Navigation between sections
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all nav items and sections
    document
      .querySelectorAll(".nav-item")
      .forEach((nav) => nav.classList.remove("active"));
    document
      .querySelectorAll(".section")
      .forEach((section) => section.classList.add("hidden"));

    // Add active class to clicked nav item and show corresponding section
    item.classList.add("active");
    const targetSection = document.getElementById(
      item.getAttribute("data-section") + "-section",
    );
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Scroll to top of terminal body
    document.getElementById("terminalBody").scrollTop = 0;
  });
});

// Download functionality for PDFs
document.querySelectorAll(".download-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const filename = button.getAttribute("data-filename");

    // For GitHub Pages, you would link to actual PDF files
    const a = document.createElement("a");
    a.href = `pdfs/${filename}`; // Adjust path as needed
    a.download = filename;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Visual feedback
    const originalText = button.textContent;
    button.textContent = "Downloaded!";
    button.classList.add("downloaded");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("downloaded");
    }, 2000);
  });
});

// Command input functionality
const commandInput = document.getElementById("commandInput");

commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = commandInput.value.trim().toLowerCase();
    commandInput.value = "";

    // Create output for the command
    const output = document.createElement("div");
    output.className = "output";
    output.innerHTML = `<span class="prompt-user">user@docs</span><span class="prompt-symbol">:~$</span> <span class="command">${command}</span>`;

    // Create response based on command
    const response = document.createElement("div");
    response.className = "output";

    switch (command) {
      case "help":
        response.innerHTML = `Available commands:
  help - Show this help message
  clear - Clear the terminal
  bachelor - Show bachelor notes
  master - Show master notes
  extra - Show extra notes
  about - About this documentation
  date - Show current date and time
  exit - Close the terminal (not really)`;
        break;
      case "clear":
        // Clear all outputs except the first few and input line
        const terminalBody = document.getElementById("terminalBody");
        const outputs = terminalBody.querySelectorAll(".output");
        const navMenu = terminalBody.querySelector(".nav-menu");
        const sections = terminalBody.querySelectorAll(".section");
        const inputLine = terminalBody.querySelector(".input-line");

        // Remove all outputs except the first two (welcome messages)
        for (let i = 2; i < outputs.length; i++) {
          if (outputs[i].parentNode) {
            outputs[i].parentNode.removeChild(outputs[i]);
          }
        }

        // Hide all sections except welcome
        sections.forEach((section) => {
          if (section.id !== "welcome-section") {
            section.classList.add("hidden");
          }
        });

        // Reset nav menu
        document.querySelectorAll(".nav-item").forEach((nav) => {
          nav.classList.remove("active");
          if (nav.getAttribute("data-section") === "welcome") {
            nav.classList.add("active");
          }
        });

        // Don't add the command output for clear
        return;
      case "bachelor":
        document
          .querySelectorAll(".nav-item")
          .forEach((nav) => nav.classList.remove("active"));
        document
          .querySelectorAll(".section")
          .forEach((section) => section.classList.add("hidden"));
        document
          .querySelector('.nav-item[data-section="bachelor"]')
          .classList.add("active");
        document.getElementById("bachelor-section").classList.remove("hidden");
        response.textContent = "Opening bachelor notes...";
        break;
      case "master":
        document
          .querySelectorAll(".nav-item")
          .forEach((nav) => nav.classList.remove("active"));
        document
          .querySelectorAll(".section")
          .forEach((section) => section.classList.add("hidden"));
        document
          .querySelector('.nav-item[data-section="master"]')
          .classList.add("active");
        document.getElementById("master-section").classList.remove("hidden");
        response.textContent = "Opening master notes...";
        break;
      case "extra":
        document
          .querySelectorAll(".nav-item")
          .forEach((nav) => nav.classList.remove("active"));
        document
          .querySelectorAll(".section")
          .forEach((section) => section.classList.add("hidden"));
        document
          .querySelector('.nav-item[data-section="extra"]')
          .classList.add("active");
        document.getElementById("extra-section").classList.remove("hidden");
        response.textContent = "Opening extra notes...";
        break;
      case "about":
        response.textContent =
          "Notes Documentation v1.0 - Terminal-style interface for organizing and accessing notes.";
        break;
      case "date":
        response.textContent = new Date().toString();
        break;
      case "exit":
        response.textContent =
          "This is a web application. To close, simply close the browser tab.";
        break;
      case "":
        // Empty command, don't add anything
        return;
      default:
        response.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    // Add command and response to terminal
    const terminalBody = document.getElementById("terminalBody");
    const inputLine = terminalBody.querySelector(".input-line");
    terminalBody.insertBefore(output, inputLine);
    terminalBody.insertBefore(response, inputLine);

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
});

// Focus on input when clicking anywhere in terminal
document.getElementById("terminalBody").addEventListener("click", () => {
  commandInput.focus();
});

// Auto-focus on page load
document.addEventListener("DOMContentLoaded", () => {
  commandInput.focus();
});
