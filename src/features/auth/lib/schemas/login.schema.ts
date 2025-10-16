import * as z from 'zod';

export const loginSchema = z.object({
  email: z.email('Невалидный email'),
  password: z.string().min(3, { error: 'Минимальное значение 3 символа' }),
  rememberMe: z.boolean().optional(),
});

export type LoginInputs = z.infer<typeof loginSchema>;
