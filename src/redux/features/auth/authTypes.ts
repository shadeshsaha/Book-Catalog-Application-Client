export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  firstName: string | null;
  userEmail: string | null;
  accessToken: string | null;
}

export type ILoginType = {
  email: string;
  password: string;
};
export type ISignUpTypes = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

};
