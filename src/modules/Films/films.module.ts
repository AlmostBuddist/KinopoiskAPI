import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import FilmsController from "./films.controller";
import FilmsService from "./films.service";

@Module({
  imports: [HttpModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export default class FilmsModule {}
