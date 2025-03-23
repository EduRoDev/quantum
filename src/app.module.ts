import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'Hotel_gateway',
      entities: [__dirname + '/**/*.models{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    HotelsModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
