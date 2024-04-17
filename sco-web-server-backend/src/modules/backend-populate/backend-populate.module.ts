import { Module } from "@nestjs/common";
import { BackendPopulateService } from "./backend-populate.service";
import { UsersModule } from "sco-nestjs-utilities";

@Module({
  imports: [
    UsersModule,
  ],
  providers: [
    BackendPopulateService,
  ]
})
export class BackendPopulateModule { }
