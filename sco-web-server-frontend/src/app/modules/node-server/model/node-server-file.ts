export class NodeServerFile {

    name: string;
    extension?: string;
    image?: string;
    size?: number;
    type?: string;
    typeDescription?: string;
    modifiedDate?: Date;

    constructor(name: string) {
        this.name = name;
        this.extension = '';
        this.image = '';
        this.size = undefined;
        this.type = '';
        this.typeDescription = '';
        this.modifiedDate = undefined;
    }
}