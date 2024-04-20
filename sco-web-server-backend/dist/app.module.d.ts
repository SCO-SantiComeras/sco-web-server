import { MiddlewareConsumer, NestModule } from "@nestjs/common";
export declare const JWT_CONTROLLER_ON: boolean;
export declare const JWT_CONTROLLER_OFF: boolean;
export declare class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
