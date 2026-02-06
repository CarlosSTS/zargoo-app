import * as Yup from 'yup';

const signInSchema = Yup.object({
  email: Yup.string()
    .required('E-mail obrigatório.')
    .email('Infome um e-mail válido.'),
  password: Yup.string().required('Senha obrigatória.'),
});

export default signInSchema;
