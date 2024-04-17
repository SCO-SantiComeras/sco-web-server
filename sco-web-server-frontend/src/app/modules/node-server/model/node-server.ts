import { NodeServerFileFilter } from "./node-server-file-filter";

export class NodeServer { 
    path?: string;
    newPath?: string;
    recursive?: boolean;
    filter?: NodeServerFileFilter;
}