export const OPERATOR_STRING_ARR = ['equals', 'does not equal', 'contains', 'does not contain'] as const;
export const OPERATOR_NUMBER_ARR = ['equal to', 'in between', 'less than', 'greater than'] as const;

export type TOperatorString = typeof OPERATOR_STRING_ARR[number];
export type TOperatorNumber = typeof OPERATOR_NUMBER_ARR[number];

export type TOperator = TOperatorString | TOperatorNumber;
