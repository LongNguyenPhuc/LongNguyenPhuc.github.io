export enum FilterLogicalOperator {
  And = ',',
  Or = '|'
}

export enum FilterApiOperator {
  Equal = '==',
  NotEqual = '!=',
  LessThan = '<',
  GreaterThan = '>',
  LessThanOrEqual = '<=',
  GreaterThanOrEqual = '>=',
  Contain = '@=',
  StartWith = '_=',
  NotStartWith = '!_=',
  CaseInsensitiveStringContain = '@=*',
  CaseInsensitiveStringNotContain = '!@=*',
  CaseInsensitiveStartWith = '_=*',
  CaseInsensitiveNotStartWith = '!_=*',
  CaseInsensitiveEqual = '==*',
  CaseInsensitiveNotEqual = '!=*'
}

export enum FilterInputType {
  Text = 'TEXT',
  Number = 'NUMBER',
  Date = 'DATE',
  Select = 'SELECT'
}
