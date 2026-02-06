const maskNumber = (value: string = ''): string => {
  return value.replace(/\D/g, '');
};

const cpfMask = (value: string = ''): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const birthDateMask = (value: string = ''): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{1,4})$/, '$1/$2');
};

const phoneMask = (value: string = ''): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{1})(\d{4})(\d)/, '$1-$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
};

const normalizeMask = (text: string = '') =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export { cpfMask, birthDateMask, phoneMask, normalizeMask, maskNumber };
