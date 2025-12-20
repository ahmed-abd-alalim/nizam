import blessed from "blessed";

export async function say(message: string) {
  // Create the screen
  const screen = blessed.screen({
    smartCSR: true,
    title: "Welcome CLI",
  });

  // Static top and bottom lines
  const topLine = blessed.box({
    top: 0,
    left: "left",
    width: "100%",
    height: 1,
    content: "nizam say:",
    style: { fg: "yellow", bold: true },
  });

  // Box for the dynamic message
  const messageBox = blessed.box({
    top: 0,
    left: 11,
    width: "100%",
    height: 1,
    content: "",
    style: { fg: "green" },
  });

  screen.append(topLine);
  screen.append(messageBox);
  screen.render();

  // Function for typing effect for just the message
  const typeEffect = async (text: string, delay = 100) => {
    messageBox.setContent("");
    screen.render();
    for (let i = 0; i < text.length; i++) {
      messageBox.setContent(text.slice(0, i + 1));
      screen.render();
      await new Promise((r) => setTimeout(r, delay));
    }
  };

  // Run the effect
  await typeEffect(message);
}
