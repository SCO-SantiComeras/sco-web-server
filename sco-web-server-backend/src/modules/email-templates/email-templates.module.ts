import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { EmailerModule, SharedModule, UsersModule } from "sco-nestjs-utilities";
import { EmailTemplatesController } from "./email-templates.controller";
import { EmailTemplatesService } from "./email-templates.service";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }), 
        SharedModule,
        EmailerModule,
        UsersModule,
    ],
    controllers: [
        EmailTemplatesController
    ],
    providers: [
        EmailTemplatesService,
    ],
    exports: [
        EmailTemplatesService,
    ]
})
export class EmailTemplatesModule { }
