import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pkgPath = resolve('', 'package.json');
  const pkg = JSON.parse(
    await readFile(pkgPath).then((buff) => buff.toString()),
  );
  const config = new DocumentBuilder()
    .setTitle('Spotze API')
    .setDescription("Accepts orders from Company X's Partners")
    .setVersion(pkg['version'])
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
