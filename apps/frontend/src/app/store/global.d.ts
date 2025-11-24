declare global {
  declare type RootState = import("./store.ts").RootState;
  declare type AppDispatch = import("./store.ts").AppDispatch;
}

export {};
