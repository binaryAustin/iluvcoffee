import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    console.time('Request-response time');
    res.on('finish', () => console.timeEnd('Request-response time'));

    next();
  }
}
