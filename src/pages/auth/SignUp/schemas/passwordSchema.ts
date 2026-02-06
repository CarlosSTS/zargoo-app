import * as Yup from 'yup';

const passwordSchema = Yup.object({
  password: Yup.string()
    .required('Senha obrigatória.')
    .min(8, 'No mínimo 8 caracteres')
    .matches(/[a-z]/, 'Deve conter letras minúsculas')
    .matches(/[A-Z]/, 'Deve conter letras maiúsculas')
    .matches(/[0-9]/, 'Deve conter ao menos um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Deve conter ao menos um caractere especial',
    ),
  confirmPassword: Yup.string()
    .required('Confirmação de senha obrigatória.')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais.'),
  acceptTerms: Yup.boolean()
    .required('Você deve aceitar os termos.')
    .oneOf([true], 'Você deve aceitar os termos.'),
});

export default passwordSchema;
