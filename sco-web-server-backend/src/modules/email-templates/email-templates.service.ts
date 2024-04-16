import { Injectable } from "@nestjs/common";
import { EmailerRepository, MessageDto, TRANSLATE_CONSTANTS, TranslateService, UserDto } from "sco-nestjs-utilities";
import * as moment from 'moment';
import { SendActivationUserDto } from "./dto/send-activation-user.dto";
import { SendRecoveryPasswordDto } from "./dto/send-recovery-password.dto";

@Injectable()
export class EmailTemplatesService {

    constructor(
        private readonly translateService: TranslateService,
        private readonly emailerRepository: EmailerRepository,
    ) { }

    async sendReoveryPasswordEmail(sendRecoveryPasswordDto: SendRecoveryPasswordDto, lang: string = TRANSLATE_CONSTANTS.DEFAULT_LANGUAGE): Promise<boolean> {
        const user: UserDto = sendRecoveryPasswordDto.user;
        const tokenExpirationTime: number = sendRecoveryPasswordDto.tokenExpiration;
        const fePort: number = sendRecoveryPasswordDto.appPort;
        const feHost: string = sendRecoveryPasswordDto.appHost

        const text = `
            ${this.translateService.getTranslate('label.hello', lang)} ${user.name},<br> 
            ${this.translateService.getTranslate('label.email.recovery.password.1', lang)} '${user.pwdRecoveryToken}'.<br>
            ${this.translateService.getTranslate('label.email.recovery.password.2', lang)} ${tokenExpirationTime} ${this.translateService.getTranslate('label.minutes', lang)} 
            (${moment(user.pwdRecoveryDate).add({minutes: tokenExpirationTime}).format('DD/MM/yyyy HH:mm:ss')}).<br>
            ${this.translateService.getTranslate('label.email.recovery.password.3', lang)} 
            <a href='http://${feHost}:${fePort}/#/reset-password/${user.pwdRecoveryToken}'>${this.translateService.getTranslate('label.email.recovery.password.4', lang)}</a>
        `;

        const message: MessageDto = {
            text: `${text}`,
            receivers: [user.email],
            subject: `${this.translateService.getTranslate('label.email.recovery.password.subject', lang)}`,
            attachments: [],
        };

        return await this.emailerRepository.sendMail(message);
    }

    async sendActiveUserEmail(sendActivationUserDto: SendActivationUserDto, lang: string = TRANSLATE_CONSTANTS.DEFAULT_LANGUAGE): Promise<boolean> {
        const user: UserDto = sendActivationUserDto.user;
        const fePort: number = sendActivationUserDto.appPort;
        const feHost: string = sendActivationUserDto.appHost

        const text = `
            ${this.translateService.getTranslate('label.hello', lang)} ${user.name},<br>
            ${this.translateService.getTranslate('label.email.active.user.1', lang)}.<br>
            ${this.translateService.getTranslate('label.email.active.user.2', lang)} 
            <a href='http://${feHost}:${fePort}/#/confirm-email/${user.email}'>${this.translateService.getTranslate('label.email.active.user.3', lang)}</a>
        `;

        const message: MessageDto = {
            text: `${text}`,
            receivers: [user.email],
            subject: `${this.translateService.getTranslate('label.email.active.user.subject', lang)}`,
            attachments: [],
        };

        return await this.emailerRepository.sendMail(message);
    }
}