/**
 * Describes a dichotomous outcome of success and failure.
 */
export type Result<Error, Data> = Failure<Error> | Success<Data>;

export class Failure<Error> {
  readonly isSuccess = false;
  constructor(readonly error: Error) {}
}

export class Success<Data> {
  readonly isSuccess = true;
  constructor(readonly data: Data) {}
}
