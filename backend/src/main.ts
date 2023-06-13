import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
}
bootstrap();
