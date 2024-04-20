import { Module } from "@nestjs/common";
import { BackendPopulateService } from "./backend-populate.service";
import { SharedModule, UsersModule } from "sco-nestjs-utilities";

@Module({
  imports: [
    UsersModule,
    SharedModule,
  ],
  providers: [
    BackendPopulateService,
  ]
})
export class BackendPopulateModule { }
