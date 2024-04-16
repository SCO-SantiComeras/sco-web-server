import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { SharedModule } from "sco-nestjs-utilities";
import { NodeServerController } from "./node-server.controller";
import { NodeServerService } from "./node-server.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    SharedModule,
  ],
  controllers: [
    NodeServerController,
  ],
  providers: [
    NodeServerService,
  ],
  exports: [
    NodeServerService,
  ]
})
export class NodeServerModule { }
