import { Module, MiddlewareConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core'; 
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'; 
import { EmployeesModule } from './employees/employees.module';
import { AuthMiddleware } from './middleware/auth.middleware'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Rate Limiter Configuration
    ThrottlerModule.forRoot([{
      ttl: 60000, // 60 seconds
      limit: 10, // 10 requests
    }]),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    EmployeesModule,
  ],
  providers: [
    // Activate Rate Limiter Globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // Configure Auth Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'employees', method: RequestMethod.ALL },
        { path: 'employees/*', method: RequestMethod.ALL }
      );
  }
}