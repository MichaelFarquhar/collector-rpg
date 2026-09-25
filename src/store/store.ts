import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "@store-player/playerSlice.ts";
import skillsReducer from "@store-skills/skillsSlice.ts";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    skills: skillsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
