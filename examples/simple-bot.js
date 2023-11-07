const {TokyoGameClient, getRandomFloat} = require("../build");

(async () => {
  // Initialize the Game client instance with your credential
  const client = new TokyoGameClient({
    serverHost: "combat.sege.dev",
    apiKey: "std0101",
    userName: "std0101",
    useSecureConnection: true,
  });

  // Get your own controller
  const controller = client.Controller();

  // Define your own algorithm here to
  client.setGamePlan((state) => {
    console.log("Current map state: ", state);
    controller.throttle(0.2);
    const angle = getRandomFloat(0.1, 1.0, 1) * 2 * Math.PI;
    controller.rotate(angle);
    controller.fire();
  }, 1000);

  process.on("SIGTERM", () => {
    client.close();
    process.exit(0);
  });
})();
