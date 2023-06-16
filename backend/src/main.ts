import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;

  const config = new DocumentBuilder()
    .setTitle('Tour Agency')
    .setDescription('Tour Agency')
    .setVersion('1.0.0')
    .addTag('Rariramz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
}
bootstrap();
