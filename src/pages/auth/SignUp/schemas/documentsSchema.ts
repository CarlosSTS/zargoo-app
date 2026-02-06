import * as Yup from 'yup';

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const cpfDigits = cpf.split('').map((el) => +el);

  const rest = (count: number): number => {
    return (
      ((cpfDigits
        .slice(0, count - 1)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10
    );
  };

  return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
};

const documentsSchema = Yup.object({
  cpf: Yup.string()
    .required('CPF obrigatório.')
    .min(11, 'CPF deve ter 11 dígitos.')
    .test('cpf-validation', 'CPF inválido.', function (value) {
      if (!value) return false;
      return validateCPF(value);
    }),
  rg: Yup.string().required('RG obrigatório.'),
  cnh: Yup.string().required('CNH obrigatória.'),
  cnh_img_url: Yup.string().required('Foto da CNH obrigatória.'),
});

export default documentsSchema;
