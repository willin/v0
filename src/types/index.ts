export enum ResultType {
  Promise = 'Promise',
  Observable = 'Observable',
  Detect = 'Detect'
}

export type ErrorHandler = (error: any, ctx: any) => void;
