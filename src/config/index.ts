export interface IConfig {
  serverHost: string;
  apiKey: string;
  userName: string;
  useHttps: boolean;
}

export const getWsServerUrl = (c: IConfig): string => {
  const protocol = c.useHttps ? "wss://" : "ws://";
  const socketPath = "/socket";
  return (
    protocol +
    c.serverHost +
    socketPath +
    "?key=" +
    c.apiKey +
    "&name=" +
    c.userName
  );
};
