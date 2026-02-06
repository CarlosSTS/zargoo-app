import * as Yup from 'yup';

const emailAddressSchema = Yup.object({
  email: Yup.string()
    .required('E-mail obrigatório.')
    .email('Infome um e-mail válido.'),
});

export default emailAddressSchema;
