export class NodeServerFileFilter {

    name?: string;
    extension?: string;
    image?: string;
    size?: number;
    type?: string;
    typeDescription?: string;
    modifiedDate?: Date;

    constructor() {
        this.name = undefined;
        this.extension = undefined;
        this.image = undefined;
        this.size = undefined;
        this.type = undefined;
        this.typeDescription = undefined;
        this.modifiedDate = undefined;
    }
}