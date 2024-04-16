import { User } from '../../users/model/user';

export class SendRecoveryPassword {
    email: string;
    user?: User;
    appHost: string;
    appPort: number;
    tokenExpiration: number;
}