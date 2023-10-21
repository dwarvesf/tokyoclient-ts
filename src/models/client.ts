import WebSocket, {CloseEvent, Event} from "isomorphic-ws";
import {EventKit, OnMessageEvent} from "../interfaces/event";
import {Gamepad} from "../interfaces/gamepad";
import {IConfig, getWsServerUrl} from "../config";

/**
 * Type representing a function that handles 'OnMessage' events, typically associated with WebSocket communication.
 *
 * @type {OnMessageFn}
 * @param {EventKit} eventKit - The event kit containing a gamepad and an event object.
 * @returns {any} - The result of handling the event.
 */
export type OnMessageFn = (eventKit: EventKit) => any;

/**
 * Type representing a function that handles 'OnOpen' events, typically associated with WebSocket communication.
 *
 * @type {OnOpenFn}
 * @param {Gamepad} gamepad - The gamepad associated with the 'OnOpen' event.
 * @returns {any} - The result of handling the event.
 */
export type OnOpenFn = (gamepad: Gamepad) => any;

export class TokyoGameClient implements Gamepad {
  private conn!: WebSocket;
  private onMessageFn: OnMessageFn | undefined;
  private onOpenFn: OnOpenFn | undefined;

  constructor(credentials: IConfig) {
    this.conn = new WebSocket(getWsServerUrl(credentials));
    this.conn.on("open", this.executeOnOpen.bind(this));
    this.conn.on("message", this.executeOnMessage.bind(this));
    this.conn.on("close", this.onClose.bind(this));
    this.conn.on("error", this.onError.bind(this));
  }

  private executeOnOpen() {
    if (!this.onOpenFn) return;
    this.onOpenFn.call(this, this);
  }

  private executeOnMessage(event: Buffer) {
    if (!this.onMessageFn) return;
    const parsed: OnMessageEvent = JSON.parse(event.toString());
    this.onMessageFn.call(this, {gamepad: this, event: parsed});
  }

  private onClose(_event: CloseEvent) {
    console.log("Disconnected.");
  }

  private onError(event: Event) {
    console.error("uhhh, an error happened:", event);
  }

  async rotate(angle: number) {
    this.conn.send(
      JSON.stringify({
        e: "rotate",
        data: angle,
      }),
    );
  }

  async throttle(speed: number) {
    this.conn.send(
      JSON.stringify({
        e: "throttle",
        data: speed,
      }),
    );
  }

  async fire() {
    this.conn.send(
      JSON.stringify({
        e: "fire",
      }),
    );
  }

  /**
   * Sets the function to handle 'OnMessage' events for the WebSocket communication.
   *
   * @param {OnMessageFn} fn - The function to handle 'OnMessage' events.
   * @returns {void}
   */
  setOnMessageFn(fn: OnMessageFn): void {
    this.onMessageFn = fn;
  }

  /**
   * Sets the function to handle 'OnOpen' events for the WebSocket communication.
   *
   * @param {OnOpenFn} fn - The function to handle 'OnOpen' events.
   * @returns {void}
   */
  setOnOpenFn(fn: OnOpenFn): void {
    this.onOpenFn = fn;
  }

  close() {
    return this.conn.close();
  }
}
