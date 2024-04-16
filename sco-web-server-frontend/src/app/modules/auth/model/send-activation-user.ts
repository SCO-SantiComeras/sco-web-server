import { User } from '../../users/model/user';

export class SendActivationUser {
    user: User;
    appHost: string;
    appPort: number;
}