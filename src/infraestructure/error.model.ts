export class GenericError extends Error {
  status: string = "error";
  message: string;
  httpCode: number;
  internalCode: number;
  description?: string | null;

  constructor({
    message,
    httpCode,
    internalCode,
    description = null,
  }: {
    message?: string;
    httpCode?: number;
    internalCode?: number;
    description?: string | null;
  }) {
    super();
    this.message = message ?? "Fallo en el servidor";
    this.httpCode = httpCode ?? 500;
    this.internalCode = internalCode ?? 0;
    this.description = description;
  }

  static SERVER_ERROR = new GenericError({
    message: "Internal error occurred",
    httpCode: 500,
    internalCode: 1,
  });
  static REQUIRED_DATA = new GenericError({
    message: "Required data",
    httpCode: 400,
    internalCode: 2,
    description: "Incomplete Data. Ensure all mandatory fields are provided.",
  });

  static AUTH_ERROR = new GenericError({
    message: "Unauthorized",
    httpCode: 401,
    internalCode: 2,
    description: "Unauthorized. Ensure your credentials are correct.",

  });
  static TOKEN_ERROR = new GenericError({
    message: "Unauthorized",
    httpCode: 498,
    internalCode: 3,
    description: "Check that your data is written correctly",

  });
  static ALREADY_EXISTS = new GenericError({
    message: "Data already exists",
    httpCode: 403,
    internalCode: 4,
  });
  static NOT_FOUND = new GenericError({
    message: "Data not found",
    httpCode: 404,
    internalCode: 5,
  });
  static INVALID_EMAIL = new GenericError({
    message: "Invalid email",
    httpCode: 422,
    internalCode: 6,
  });
  static INVALID_DATE = new GenericError({
    message: "Invalid date",
    httpCode: 422,
    internalCode: 6,
  });
  static WRONG_EMAIL_OR_PASSWORD = new GenericError({
    message: "Wrong email or password",
    httpCode: 401,
    internalCode: 7,
    description: "Check that your data is written correctly",
  });
  static ROLE_ERROR = new GenericError({
    message: "Unauthorized",
    httpCode: 403,
    internalCode: 8,
    description: "You do not have sufficient permissions.",
  });
}
