// eslint-disable-next-line max-classes-per-file
export class ApplicationError extends Error {
  constructor(statusCode: number, message = 'an error occurred', errors: any) {
    super(message);
    // @ts-ignore
    this.statusCode = statusCode || 500;
    this.message = message;
    // @ts-ignore
    this.errors = errors;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: any) {
    // @ts-ignore
    super(404, message || 'resource not found');
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: any) {
    // @ts-ignore
    super(400, message || 'Path is required');
  }
}
