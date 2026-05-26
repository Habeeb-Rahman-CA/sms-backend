import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('School Management System API')
    .setDescription('REST API for the multi-tenant School Management System')
    .setVersion('1.0')
    .addTag('Schools', 'School tenant management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Enable CORS
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  console.log(`\n🚀 Application running on: http://localhost:${process.env.PORT ?? 3000}/api/v1`);
  console.log(`📖 Swagger docs available at: http://localhost:${process.env.PORT ?? 3000}/api/docs\n`);
}
bootstrap();
