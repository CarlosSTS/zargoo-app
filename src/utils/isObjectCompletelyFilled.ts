import every from 'lodash/every';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import trim from 'lodash/trim';
import values from 'lodash/values';

/**
 * Verifica se um objeto (ou valor) está completamente preenchido.
 * Retorna false se o valor for nulo, indefinido, uma string vazia,
 * um array vazio ou um objeto com propriedades vazias.
 *
 * @param value - O valor a ser verificado.
 * @returns true se o objeto estiver completamente preenchido, false caso contrário.
 */

const isObjectCompletelyFilled = (value: unknown): boolean => {
  if (isNil(value)) {
    return false;
  }

  if (isString(value)) {
    return trim(value) !== '';
  }

  if (isArray(value)) {
    return value.length > 0 && every(value, isObjectCompletelyFilled);
  }

  if (isPlainObject(value)) {
    return every(values(value), isObjectCompletelyFilled);
  }

  return true;
};

export default isObjectCompletelyFilled;
