import { Login } from '@prisma/client';

export class LoginEntity implements Login {
  id: number;
  userId: number;
  sessionId: string;
  username: string;
  ip: string;
  address: string;
  createdAt: Date;
}
