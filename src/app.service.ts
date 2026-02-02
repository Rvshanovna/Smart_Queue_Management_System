import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

export class App {
  static async main() {
    const app = await NestFactory.create(AppModule);
    const PORT = envConfig.PORT || 3000;
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.listen(PORT, () => console.log('Server is running on port', PORT));
  }
}
