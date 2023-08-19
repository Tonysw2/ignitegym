import * as z from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().trim().nonempty('Este campo é obrigatório.'),
    email: z
      .string()
      .trim()
      .nonempty('Este campo é obrigatório.')
      .email('E-mail inválido.'),
    password: z
      .string()
      .trim()
      .nonempty('Este campo é obrigatório.')
      .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
    password_confirm: z.string().trim().nonempty('Este campo é obrigatório.'),
  })
  .refine((values) => values.password_confirm === values.password, {
    message: 'A confirmação da senha não confere.',
    path: ['password_confirm'],
  })

export const profileUpdateSchema = z
  .object({
    name: z.string().nonempty('Informe o nome.').trim(),
    old_password: z.string().trim(),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 dígitos.')
      .trim()
      .nullish()
      .transform((value) => (!!value ? value : undefined)),
    password_confirm: z
      .string()
      .trim()
      .nullish()
      .transform((value) => (!!value ? value : undefined)),
  })
  .refine((values) => values.password === values.password_confirm, {
    message: 'A confirmação da senha não confere.',
    path: ['password_confirm'],
  })
