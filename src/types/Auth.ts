export interface LoginRequestBody {
  email: string;
  password: string;
  username: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
