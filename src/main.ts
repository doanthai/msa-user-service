import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'fastify-compress';
import { AppClusterService, MsaLogger } from 'msa-util';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const logger = app.get(MsaLogger);
  logger.setLogLevels(configService.get('loggerOutput'));

  app.useLogger(logger);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('User service')
    .setDescription('The user service API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'User API Docs',
  });

  //TODO: use for connect with other service
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     host: '0.0.0.0',
  //     port: 8000,
  //   },
  // });
  // await app.startAllMicroservices();

  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  if (configService.get<string>('ENV') === 'local') {
    await app.listen(configService.get<number>('port'));
    return;
  }
  AppClusterService.register(
    logger,
    async () => await app.listen(configService.get<number>('port')),
  );
}

bootstrap();
