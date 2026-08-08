export type UserRole = 'admin' | 'chef' | 'manager';

export class User {
  userId?: string;
  email = '';
  password = '';
  fullname = '';
  role: UserRole | '' = '';  
  phone = '';
  createdAt?: Date;
  updatedAt?: Date;
}
