import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilmsModule } from '../Films/films.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), FilmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
