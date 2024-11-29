import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(255, 'Password must be less than 255 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
  });

export type SignInDTO = z.infer<typeof signInSchema>;
export type SignUpDTO = z.infer<typeof signUpSchema>;
