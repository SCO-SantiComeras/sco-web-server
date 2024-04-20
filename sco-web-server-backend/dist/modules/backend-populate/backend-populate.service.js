"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendPopulateService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sco_nestjs_utilities_1 = require("sco-nestjs-utilities");
let BackendPopulateService = class BackendPopulateService {
    constructor(configService, usersRepository, bcryptService) {
        this.configService = configService;
        this.usersRepository = usersRepository;
        this.bcryptService = bcryptService;
    }
    async onModuleInit() {
        await this.deleteSuperadminUser();
        await this.deletePublicUser();
        await this.updateUsersPassword();
    }
    async deleteSuperadminUser() {
        const existSuperAdminUser = await this.usersRepository.findUserByName(sco_nestjs_utilities_1.USERS_CONSTANTS.SUPERADMIN.NAME);
        if (existSuperAdminUser) {
            const deletedUser = await this.usersRepository.deleteUser(existSuperAdminUser._id);
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
        const existPublicUser = await this.usersRepository.findUserByName(sco_nestjs_utilities_1.USERS_CONSTANTS.PUBLIC.NAME);
        if (existPublicUser) {
            const deletedUser = await this.usersRepository.deleteUser(existPublicUser._id);
            if (!deletedUser) {
                console.log(`[deletePublicUser] Unnable to delete public user`);
                throw new Error(`Unnable to delete public user`);
            }
            console.log(`[deletePublicUser] Public user deleted successfully`);
        }
    }
    async updateUsersPassword() {
        const existAdminUser = await this.usersRepository.findUserByName(sco_nestjs_utilities_1.USERS_CONSTANTS.ADMIN.NAME);
        const adminDto = await this.usersRepository.modelToDto(existAdminUser);
        adminDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
        await this.usersRepository.updateUser(existAdminUser._id, adminDto, true);
        if (this.configService.get('populate.publicUser') == true) {
            const existPublicUser = await this.usersRepository.findUserByName(sco_nestjs_utilities_1.USERS_CONSTANTS.PUBLIC.NAME);
            const publicDto = await this.usersRepository.modelToDto(existPublicUser);
            publicDto.password = await this.bcryptService.encryptPassword('Scoserver123456!');
            await this.usersRepository.updateUser(existPublicUser._id, publicDto, true);
        }
    }
};
BackendPopulateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        sco_nestjs_utilities_1.UsersRepository,
        sco_nestjs_utilities_1.BcryptService])
], BackendPopulateService);
exports.BackendPopulateService = BackendPopulateService;
//# sourceMappingURL=backend-populate.service.js.map