import { NextFunction, Request, Response } from 'express';
import { GenericError } from '../infraestructure/error.model';
export class ServerConfigurations {
  public static handleErrorMiddelware(error: any, req: Request, res: Response, next: NextFunction) {
    if (error instanceof GenericError) {
      res.status(error.httpCode).json(error);
    } else {
      console.error('ERROR:', error);
      res.status(500).json({
        message: 'Fallo en el servidor',
        httpCode: 500,
        internalCode: 0,
        error: error.toString()
      });
    }
  }

  public static addHeaders(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }
}
