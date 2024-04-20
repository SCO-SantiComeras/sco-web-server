import { ConfigService } from "@nestjs/config";
import { BcryptService, UsersRepository } from "sco-nestjs-utilities";
export declare class BackendPopulateService {
    private readonly configService;
    private readonly usersRepository;
    private readonly bcryptService;
    constructor(configService: ConfigService, usersRepository: UsersRepository, bcryptService: BcryptService);
    onModuleInit(): Promise<void>;
    deleteSuperadminUser(): Promise<void>;
    deletePublicUser(): Promise<void>;
    updateUsersPassword(): Promise<void>;
}
