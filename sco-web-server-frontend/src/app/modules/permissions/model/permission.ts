
export class Permission {
    _id?: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    typeObj?: string;

    constructor(name: string = undefined) {
        this.name = name;
    }
}