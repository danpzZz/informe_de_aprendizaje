import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformesModule } from './informes/informes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'danpzZz01',
      database: 'informe_de_aprendizaje',
      autoLoadEntities: true,
      synchronize: true,
    }),
    InformesModule,
  ],
})
export class AppModule {}