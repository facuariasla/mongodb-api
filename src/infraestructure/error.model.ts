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
    message: "INTERNAL SERVER OCURRED",
    httpCode: 500,
    internalCode: 1,
  });
  static REQUIRED_DATA = new GenericError({
    message: "REQUIRED DATA",
    httpCode: 400,
    internalCode: 2,
    description: "Incomplete Data. Ensure all mandatory fields are provided.",
  });

  static AUTH_ERROR = new GenericError({
    message: "NOT AUTHORIZED",
    httpCode: 401,
    internalCode: 2,
  });
  static TOKEN_ERROR = new GenericError({
    message: "INVALID TOKEN",
    httpCode: 498,
    internalCode: 3,
  });
  static ALREADY_EXISTS = new GenericError({
    message: "DATA ALREADY EXISTS",
    httpCode: 403,
    internalCode: 4,
  });
  static NOT_FOUND = new GenericError({
    message: "NOT FOUND",
    httpCode: 404,
    internalCode: 5,
  });
  static INVALID_EMAIL = new GenericError({
    message: "INVALID EMAIL",
    httpCode: 422,
    internalCode: 6,
  });
  static INVALID_DATE = new GenericError({
    message: "INVALID DATE",
    httpCode: 422,
    internalCode: 6,
  });
  static WRONG_EMAIL_OR_PASSWORD = new GenericError({
    message: "Correo o contraseña incorrecta",
    httpCode: 401,
    internalCode: 7,
    description: "Check that your data is written correctly",
  });
  static ROLE_ERROR = new GenericError({
    message: "NOT AUTHORIZED",
    httpCode: 403,
    internalCode: 8,
    description: "You do not have sufficient permissions.",
  });
}
