import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IncomingMessage, Server, ServerResponse } from 'http';

export const swaggerConfig = (
  app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
  >,
) => {
  const docConfig = new DocumentBuilder()
    .setTitle('API Documentation Teddy Open Finance Test')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api/v0/docs', app, document);
};
