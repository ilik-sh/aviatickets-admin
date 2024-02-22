import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { LocalStorageKeys } from "../enums/local-storage-keys.enum";

export class SocketClient {
  socket: Socket | null = null;

  connect() {
    this.socket = io("http://localhost:3002", {
      auth: {
        token: localStorage.getItem(LocalStorageKeys.AccessToken),
      },
      transports: ["websocket"],
    });

    return new Promise((resolve, rejectWithValue) => {
      this.socket?.on("connect", () => {
        resolve(null);
      });
      this.socket?.on("error", (error) => {
        rejectWithValue(error);
      });
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket?.disconnect();
      this.socket?.on("disconnect", () => {
        this.socket = null;
        resolve(null);
      });
    });
  }

  emit(event: string, data: any) {
    return new Promise((resolve, rejectWithValue) => {
      if (!this.socket) return rejectWithValue("No socket connection");

      return this.socket.emit(event, data);
    });
  }

  on(event: string, fun: (args: any) => void) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("No socket connection.");

      this.socket.on(event, fun);
      resolve(null);
    });
  }
}
