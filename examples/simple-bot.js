const {
  TokyoGameClient,
  getRandomFloat,
} = require("../build");

(async () => {
  // Initialize the Game client instance
  const client = new TokyoGameClient({
    serverHost: "combat.sege.dev",
    apiKey: "human",
    userName: "human",
    useHttps: true,
  });

  // Get your own gamepad
  const gamepad = client.GamePad();

  // Define your onMessage callback function
  client.setOnOpenFn((e) => {
    console.log("Successfully joined the game.");
  });

  // Define your onMessage callback function
  client.setOnMessageFn((e) => {
    gamepad.throttle(1);
    const angle = getRandomFloat(0.1, 1.0, 1) * 2 * Math.PI;
    gamepad.rotate(angle);
    console.log(`[rotating] by ${angle} .`);
    gamepad.fire();
  });

  process.on("SIGTERM", () => {
    client.close();
    process.exit(0);
  });
})();
