export interface User {
    id: string;
    role: 'admin' | 'user';
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    _verified?: boolean | null;
    _verificationToken?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    password: string | null;
  }