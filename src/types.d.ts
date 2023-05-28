interface CustomEventMap {
  "computer-action": CustomEvent<string>;
}
declare global {
  interface Document { //ad-hoc adds type safety for the custom events
    addEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    removeEventListener<K extends keyof CustomEventMap>(type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void): void;
    dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): void;
  }
}
export { }; //keep that for TS compiler.
