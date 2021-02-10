class AppError {
  public readonly errorMessage: string;

  public readonly errorCode: number;

  constructor(errorMessage: string, errorCode = 400) {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

export default AppError;
