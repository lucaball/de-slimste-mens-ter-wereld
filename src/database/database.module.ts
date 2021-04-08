import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {DynamicModule, Module} from '@nestjs/common';

export function getOrmConfig(): TypeOrmModuleOptions {
    return {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: ["dist/Models/**/*{.ts,.js}"],
        synchronize: true,
        logging: true,
        "extra": {
            "ssl": {
                "rejectUnauthorized": false
            }
        }
    };
}

@Module({})
export class DatabaseModule {
    public static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRoot(getOrmConfig())
            ],
        };
    }
}
