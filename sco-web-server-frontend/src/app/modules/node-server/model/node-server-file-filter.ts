export class NodeServerFileFilter {

    name?: string;
    extension?: string;
    size?: number;
    type?: string;
    typeDescription?: string;
    modifiedDate?: Date;

    constructor() {
        this.name = '';
        this.extension = '';
        this.size = undefined;
        this.type = '';
        this.typeDescription = '';
        this.modifiedDate = undefined;
    }
}