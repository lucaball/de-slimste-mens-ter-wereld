import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from 'path';
import {Logger} from "@nestjs/common";

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'public/build'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.setViewEngine({
        engine: {
            handlebars: require('handlebars'),
        },
        templates: join(__dirname, '..', 'views'),
    });

    await app.listen(process.env.PORT || 8080);

    Logger.verbose("App running on " + await app.getUrl());
}

bootstrap();
