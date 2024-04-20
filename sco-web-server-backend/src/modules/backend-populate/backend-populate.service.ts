import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BcryptService, IUser, USERS_CONSTANTS, UserDto, UsersRepository } from "sco-nestjs-utilities";

@Injectable()
export class BackendPopulateService {

    constructor(
        private readonly configService: ConfigService,
        private readonly usersRepository: UsersRepository,
        private readonly bcryptService: BcryptService,
    ) { }

    async onModuleInit() {
        await this.deleteSuperadminUser();
        await this.deletePublicUser();
        await this.updateUsersPassword();
    }

    async deleteSuperadminUser() {
        const existSuperAdminUser: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.SUPERADMIN.NAME);
        if (existSuperAdminUser) {
            const deletedUser: boolean = await this.usersRepository.deleteUser(existSuperAdminUser._id);
            if (!deletedUser) {
                console.log(`[deleteSuperadminUser] Unnable to delete Superadmin user`);
                throw new Error(`Unnable to delete Superadmin user`);
            }
            console.log(`[deleteSuperadminUser] Superadmin user deleted successfully`);
        }
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
            console.log(`[deletePublicUser] Public user deleted successfully`);
        }
    }

    async updateUsersPassword() {
        const existAdminUser: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.ADMIN.NAME);
        const adminDto: UserDto = await this.usersRepository.modelToDto(existAdminUser);
        adminDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
        await this.usersRepository.updateUser(existAdminUser._id, adminDto, true);

        if (this.configService.get('populate.publicUser') == true) {
            const existPublicUser: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.PUBLIC.NAME);
            const publicDto: UserDto = await this.usersRepository.modelToDto(existPublicUser);
            publicDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
            await this.usersRepository.updateUser(existPublicUser._id, publicDto, true);
        }
    }
}
