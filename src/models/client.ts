import WebSocket, {CloseEvent, Event, MessageEvent} from "isomorphic-ws";
import {OnMessageEvent} from "../interfaces/event";
import {Gamepad} from "../interfaces/gamepad";
import {IConfig, getWsServerUrl} from "../config";

/**
 * Type representing a function that handles 'OnMessage' events, typically associated with WebSocket communication.
 *
 * @type {OnMessageFn}
 * @param {OnMessageEvent} event - The 'OnMessage' event payload.
 * @returns {any} - The result of handling the event.
 */
export type OnMessageFn = (event: OnMessageEvent) => any;

/**
 * Type representing a function that handles 'OnOpen' events, typically associated with WebSocket communication.
 *
 * @type {OnOpenFn}
 * @param {Event} event - The 'OnOpen' event payload.
 * @returns {any} - The result of handling the event.
 */
export type OnOpenFn = (event: Event) => any;

export class TokyoGameClient {
  private conn!: WebSocket;
  private onMessageFn: OnMessageFn | undefined;
  private onOpenFn: OnOpenFn | undefined;

  constructor(credentials: IConfig) {
    this.conn = new WebSocket(getWsServerUrl(credentials));
    this.conn.onopen = this.executeOnOpen.bind(this);
    this.conn.onclose = this.executeOnClose.bind(this);
    this.conn.onerror = this.executeOnError.bind(this);
  }

  private executeOnOpen(e: Event) {
    if (!this.onOpenFn) return;
    this.onOpenFn.call(this, e);
  }

  private executeOnMessage(event: MessageEvent) {
    if (!this.onMessageFn) return;
    if (event) {
      const parsed: OnMessageEvent = JSON.parse(event.data.toString());
      this.onMessageFn.call(this, parsed);
    }
  }

  private executeOnClose(_event: CloseEvent) {
    console.log("Disconnected.");
  }

  private executeOnError(event: Event) {
    console.error("uhhh, an error happened:", event);
  }

  private rotate(angle: number): void {
    this.conn.send(
      JSON.stringify({
        e: "rotate",
        data: angle,
      }),
    );
  }

  private throttle(speed: number): void {
    this.conn.send(
      JSON.stringify({
        e: "throttle",
        data: speed,
      }),
    );
  }

  private fire(): void {
    this.conn.send(
      JSON.stringify({
        e: "fire",
      }),
    );
  }

  /**
   * Returns a gamepad for controlling the game.
   *
   * @returns {Gamepad}
   */
  GamePad(): Gamepad {
    return {
      rotate: this.rotate.bind(this),
      throttle: this.throttle.bind(this),
      fire: this.fire.bind(this),
    } as Gamepad;
  }

  /**
   * Sets the function to handle 'OnMessage' events for the WebSocket communication.
   *
   * @param {OnMessageFn} fn - The function to handle 'OnMessage' events.
   * @returns {void}
   */
  setOnMessageFn(fn: OnMessageFn): void {
    this.onMessageFn = fn;
    this.conn.onmessage = this.executeOnMessage.bind(this);
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
