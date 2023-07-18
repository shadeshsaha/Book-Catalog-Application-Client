/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  isLoading: true,
  isSuccess: false,
  error: null,
  firstName: localStorage.getItem("firstName") || null,
  userEmail: localStorage.getItem("email") || null,
  accessToken: localStorage.getItem("token") || null,
};

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await fetch(
        "https://server-book-catalog-application.vercel.app/api/v1/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error();
    }
  }
);
export const createUser = createAsyncThunk(
  "signup",
  async ({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const response = await fetch(
        "https://server-book-catalog-application.vercel.app/api/v1/user/create-user",
        {
          method: "POST",
          body: JSON.stringify({ email, password, firstName, lastName }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("SIGNUP failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error();
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string | null>) => {
      state.firstName = action.payload;
    },
    setUserEmail: (
      state,
      action: PayloadAction<{ data: { email: string | null } }>
    ) => {
      state.userEmail = action.payload?.data.email;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setAccessToken: (
      state,
      action: PayloadAction<{ data: { accessToken: string | null } }>
    ) => {
      state.accessToken = action.payload?.data?.accessToken;
      localStorage.setItem(
        "accessToken",
        action.payload?.data?.accessToken || ""
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.userEmail = action.payload.data.email;
        state.accessToken = action.payload.data.accessToken;
        state.firstName = action.payload.data.userDetails.firstName;
        localStorage.setItem("token", action.payload.data.accessToken);
        localStorage.setItem("email", action.payload.data.email);
        localStorage.setItem(
          "firstName",
          action.payload.data.userDetails.firstName
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })

      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      });
  },
});

export const { setAccessToken, setUserEmail, setLoading, setFirstName } =
  authSlice.actions;

export default authSlice.reducer;
