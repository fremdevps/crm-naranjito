
//Login Parameters
export interface LoginParams {
  username: string;
  password: string;
}


export interface LoginResponse {
  items: Item[]
}

export interface Item {
  clogiusuar: string
  cpassusuar: string
}

// error Response
export interface ErrorResponse {
  status: string;
  error_code: number;
}

