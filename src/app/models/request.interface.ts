export interface LoginRequest {
  userName: string;
  passwordHash: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  createdBy: bigint;
  active : number;
}
