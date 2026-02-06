import * as Yup from 'yup';

const nameSchema = Yup.object({
  first_name: Yup.string()
    .required('Primeiro nome obrigatório.')
    .min(2, 'Primeiro nome deve ter pelo menos 2 caracteres.')
    .max(50, 'Primeiro nome deve ter no máximo 50 caracteres.')
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Primeiro nome deve conter apenas letras.'),
  last_name: Yup.string()
    .required('Sobrenome obrigatório.')
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres.')
    .max(50, 'Sobrenome deve ter no máximo 50 caracteres.')
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, 'Sobrenome deve conter apenas letras.'),
  state: Yup.string().required('Estado obrigatório.'),
  city: Yup.string().required('Cidade obrigatória.'),
});

export default nameSchema;
