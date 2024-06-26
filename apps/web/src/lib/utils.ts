import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isClient() {
  return typeof window !== "undefined";
}

// Capture the logging done with console.log
export class Capture {
  #captureLog: boolean;
  #cb?: (ogLog: typeof console.log, val: any[]) => void;
  oldLog: typeof console.log;
  public get captureLog() {
    return this.#captureLog;
  }
  public get cb() {
    return this.#cb;
  }
  constructor() {
    this.#captureLog = false;
    this.#cb = undefined;
    this.oldLog = console.log;

    console.log = (...args) => {
      if (this.captureLog && this.cb) {
        this.cb(this.oldLog, args);
      } else {
        this.oldLog(...args);
      }
    };
  }
  capture(cb: (ogLog: typeof console.log, val: any[]) => void) {
    this.oldLog("capturing");
    this.#captureLog = true;
    this.#cb = cb;
  }
  release() {
    this.oldLog("releasing");
    this.#captureLog = false;
    this.#cb = undefined;
  }
}
