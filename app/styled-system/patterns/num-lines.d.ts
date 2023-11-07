/* eslint-disable */
import type { SystemStyleObject, ConditionalValue } from '../types/index';
import type { Properties } from '../types/csstype';
import type { PropertyValue } from '../types/prop-type';
import type { DistributiveOmit } from '../types/system-types';
import type { Tokens } from '../tokens/index';

export interface NumLinesProperties {
   lines?: ConditionalValue<number>
}


interface NumLinesStyles extends NumLinesProperties, DistributiveOmit<SystemStyleObject, keyof NumLinesProperties > {}

interface NumLinesPatternFn {
  (styles?: NumLinesStyles): string
  raw: (styles?: NumLinesStyles) => SystemStyleObject
}

/** Simplifies the declaration of the number of lines of text */
export declare const numLines: NumLinesPatternFn;
