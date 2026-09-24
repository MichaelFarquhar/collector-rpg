import { createSlice } from "@reduxjs/toolkit";

export type Skill = {
  name: string;
  id: string;
  description: string;
};

type SkillsState = {
  skills: Skill[];
};

const initialState: SkillsState = {
  skills: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
});

export default skillsSlice.reducer;
