import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type PostsUiState = {
  compact: boolean;
};

const initialState: PostsUiState = {
  compact: false,
};

const postsSlice = createSlice({
  name: 'postsUi',
  initialState,
  reducers: {
    setCompact(state, action: PayloadAction<boolean>) {
      state.compact = action.payload;
    },
  },
});

export const { setCompact } = postsSlice.actions;
export const postsSliceReducer = postsSlice.reducer;
