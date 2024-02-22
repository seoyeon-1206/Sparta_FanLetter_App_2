import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "api";

// 새로고침시 initialState로
const initialState = {
  letters: [],
  isLoading: true,
  isError: false,
  error: null,

};

const getLettersFromDB = async () => {
  const { data } = await jsonApi.get('/letters?_sort=id,-views');
  return data;
}

export const __deleteLetter = createAsyncThunk(
  "__deleteLetter",
  async (id, thunkAPI) => {
    try {
      await jsonApi.delete(`/letters/${id}`)
      // db에 있는 최신 데이터 불러오기
      const letters = await getLettersFromDB();
      return letters;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __editLetter = createAsyncThunk(
  "editLetter",
  async ({ id, editingText }, thunkAPI) => {
    try {
      await jsonApi.patch(`/letters/${id}`, { content: editingText })
      const letters = await getLettersFromDB();
      return letters;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }

  }
)

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const letters = await getLettersFromDB();
      return letters;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const __addLetter = createAsyncThunk(
  "addLetter",
  async (newLetter, thunkAPI) => {
    try {
      await jsonApi.post('/letters', newLetter);
      const letters = await getLettersFromDB();
      return letters
    } catch (error) {
      return thunkAPI.rejectWithValue(error); //extra reducer로 전달됌
    }
  }
)

const lettersSlice = createSlice({
  name: 'letters',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(__addLetter.pending, (state, aciton) => {
        state.isLoading = true
      })
      .addCase(__addLetter.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.letters = aciton.payload; //action.payload = data
        state.isError = false
        state.error = null
      })
      .addCase(__addLetter.rejected, (state, aciton) => {
        state.isLoading = false
        state.isError = true
        state.error = aciton.payload //error 전달받음
      })
      .addCase(__getLetters.pending, (state, aciton) => {
        state.isLoading = true
      })
      .addCase(__getLetters.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.letters = aciton.payload; //action.payload = data
        state.isError = false
        state.error = null
      })
      .addCase(__getLetters.rejected, (state, aciton) => {
        state.isLoading = false
        state.isError = true
        state.error = aciton.payload //error 전달받음
      })
      .addCase(__deleteLetter.pending, (state, aciton) => {
        state.isLoading = true
      })
      .addCase(__deleteLetter.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.letters = aciton.payload; //action.payload = data
        state.isError = false
        state.error = null
      })
      .addCase(__deleteLetter.rejected, (state, aciton) => {
        state.isLoading = false
        state.isError = true
        state.error = aciton.payload //error 전달받음
      })
      .addCase(__editLetter.pending, (state, aciton) => {
        state.isLoading = true
      })
      .addCase(__editLetter.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.letters = aciton.payload; //action.payload = data
        state.isError = false
        state.error = null
      })
      .addCase(__editLetter.rejected, (state, aciton) => {
        state.isLoading = false
        state.isError = true
        state.error = aciton.payload //error 전달받음
      })
  }
});

export default lettersSlice.reducer;
