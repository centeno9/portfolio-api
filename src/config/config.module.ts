import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import validationSchema from './validation.schema';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', '.env.development'],
      validationSchema,
    }),
  ],
})
export class AppConfigModule {}
