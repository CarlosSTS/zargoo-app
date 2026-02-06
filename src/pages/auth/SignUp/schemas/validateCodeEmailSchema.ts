import * as Yup from 'yup';

const validateCodeEmailSchema = Yup.object({
  code1: Yup.string()
    .required('Digite o código.')
    .matches(/^[0-9]$/, 'Apenas números são permitidos.'),
  code2: Yup.string()
    .required('Digite o código.')
    .matches(/^[0-9]$/, 'Apenas números são permitidos.'),
  code3: Yup.string()
    .required('Digite o código.')
    .matches(/^[0-9]$/, 'Apenas números são permitidos.'),
  code4: Yup.string()
    .required('Digite o código.')
    .matches(/^[0-9]$/, 'Apenas números são permitidos.'),
  code5: Yup.string()
    .required('Digite o código.')
    .matches(/^[0-9]$/, 'Apenas números são permitidos.'),
  code6: Yup.string()
    .required('Digite o código.')
    .matches(/^[0-9]$/, 'Apenas números são permitidos.'),
});

export default validateCodeEmailSchema;
