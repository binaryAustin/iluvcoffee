import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middlewares/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply to all routes
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // Apply to a specific route
    consumer.apply(LoggingMiddleware).forRoutes('coffees');
    // Apply to a specific method of a route
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: 'coffees', method: RequestMethod.GET });
    // Exclude route
    consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');
  }
}
