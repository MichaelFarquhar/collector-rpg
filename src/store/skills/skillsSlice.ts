import { createSlice } from "@reduxjs/toolkit";
import type { SkillsState } from "./skillsTypes.ts";

const initialState: SkillsState = {
  skills: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
});

export default skillsSlice.reducer;
