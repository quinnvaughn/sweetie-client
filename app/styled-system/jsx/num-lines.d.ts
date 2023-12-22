/* eslint-disable */
import type { FunctionComponent } from 'react'
import type { NumLinesProperties } from '../patterns/num-lines';
import type { HTMLStyledProps } from '../types/jsx';
import type { DistributiveOmit } from '../types/system-types';

export interface NumLinesProps extends NumLinesProperties, DistributiveOmit<HTMLStyledProps<'div'>, keyof NumLinesProperties > {}

/** Simplifies the declaration of the number of lines of text */
export declare const NumLines: FunctionComponent<NumLinesProps>