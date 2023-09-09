import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAPI = createAsyncThunk("data/getAPI", async () => {
  let response = await fetch("https://cat-fact.herokuapp.com/facts");
  let json = await response.json();
  return json;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    facts: [],
    status: null,
    loaded: false,
    like: false,
  },
  reducers: {
    deleteCard: (state, action) => {
        state.facts = state.facts.filter(fact => fact._id !== action.payload) 
    }, 
    likeCard: (state, action) => {
      let likedCard = state.facts.find((fact) => fact._id === action.payload);
      if (likedCard) {
        likedCard.like = !likedCard.like;
      }
  }, 
  },
  extraReducers: {
    [getAPI.fulfilled]: (state, action) => {
      let updatedfacts = state.facts.concat(action.payload);
      state.facts = updatedfacts;
      state.status = null;
      state.like = false;
      state.loaded = true;
    },
    [getAPI.pending]: (state) => {
      state.status = "Fetching facts. Please wait a moment...";
    },
    [getAPI.rejected]: (state) => {
      state.status = "Failed to fetch data...";
    }
 }
});

export const { deleteCard, likeCard } = dataSlice.actions;

export default dataSlice.reducer;