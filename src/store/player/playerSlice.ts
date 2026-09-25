import { createSlice } from "@reduxjs/toolkit";
import type { PlayerState } from "./playerTypes.ts";

const initialState: PlayerState = {
  name: "Joe Schmoe",
  level: 1,
  currency: {
    coins: 0,
    souls: 0,
  },
  equippment: {},
  toolbelt: {
    scavenging_tool: "",
    woodcutting_tool: "",
    occultism_tool: "",
    thieving_tool: "",
  },
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {},
});

export default playerSlice.reducer;
