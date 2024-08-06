import { MaskitoOptions } from '@maskito/core';


const Constants = {
  ALUNO_ID: 5,
  INSTRUTOR_ID: 2,
  GERENCIA_ID: 3,
  phoneMask:  {
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
  cpfMask:  {
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
}

export default Constants
