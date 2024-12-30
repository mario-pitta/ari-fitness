import { MaskitoOptions } from '@maskito/core';

const Constants = {
  ALUNO_ID: 5,
  INSTRUTOR_ID: 2,
  GERENCIA_ID: 3,
  phoneMask: {
    mask: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  } as MaskitoOptions,
  cpfMask: {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  } as MaskitoOptions,
  alturaMask: {
    mask: [/\d/, '.', /\d/, /\d/],
  } as MaskitoOptions,
  pesoMask: {
    mask: [/\d/, /\d/, '.', /\d/, /\d/],
  } as MaskitoOptions,

  meses: [
    { value: '01', label: 'Janeiro' },
    { value: '02', label: 'Fevereiro' },
    { value: '03', label: 'Março' },
    { value: '04', label: 'Abril' },
    { value: '05', label: 'Maio' },
    { value: '06', label: 'Junho' },
    { value: '07', label: 'Julho' },
    { value: '08', label: 'Agosto' },
    { value: '09', label: 'Setembro' },
    { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' },
    { value: '12', label: 'Dezembro' },
  ],
};

export default Constants;
