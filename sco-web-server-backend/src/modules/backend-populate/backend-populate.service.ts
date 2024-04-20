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
        await this.deletePublicUser();
        await this.updateUsersPassword();
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
        const existSuperadmin: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.SUPERADMIN.NAME);
        const superAdminDto: UserDto = await this.usersRepository.modelToDto(existSuperadmin);
        superAdminDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
        await this.usersRepository.updateUser(existSuperadmin._id, superAdminDto, true);

        const existAdminUser: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.ADMIN.NAME);
        const adminDto: UserDto = await this.usersRepository.modelToDto(existAdminUser);
        adminDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
        await this.usersRepository.updateUser(existAdminUser._id, adminDto, true);

        if (this.configService.get('populate.publicUser') == false) {
            return;
        }

        const existPublicUser: IUser = await this.usersRepository.findUserByName(USERS_CONSTANTS.PUBLIC.NAME);
        const publicDto: UserDto = await this.usersRepository.modelToDto(existPublicUser);
        publicDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
        await this.usersRepository.updateUser(existPublicUser._id, publicDto, true);
    }
}
