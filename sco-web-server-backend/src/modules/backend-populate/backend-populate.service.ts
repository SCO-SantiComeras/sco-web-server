import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IUser, USERS_CONSTANTS, UsersRepository } from "sco-nestjs-utilities";

@Injectable()
export class BackendPopulateService {

    constructor(
        private readonly configService: ConfigService,
        private readonly usersRepository: UsersRepository,
    ) { }

    async onModuleInit() {
        console.log("Populate init");
        await this.deletePublicUser();
    }

    async deletePublicUser() {
        if (this.configService.get('populate.publicUser') == true) {
            return;
        }

        const existPublicUser: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.PUBLIC.NAME);
        if (existPublicUser) {
            const deletedUser: boolean = await this.usersRepository.deleteUser(existPublicUser._id);
            if (!deletedUser) {
                console.log(`[deletePublicUser] Unnable to delete public user`);
                throw new Error(`Unnable to delete public user`);
            }
        }
    }
}
