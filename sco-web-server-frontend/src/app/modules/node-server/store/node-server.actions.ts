import { NodeServer } from "../model/node-server";
import { NodeServerFileFilter } from "../model/node-server-file-filter";

export class Exists {
  static readonly type = "[NodeServer] Exists file";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class IsDirectory {
  static readonly type = "[NodeServer] File is directory";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class IsFile {
  static readonly type = "[NodeServer] File is file";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class List {
  static readonly type = "[NodeServer] List files";
  constructor(public payload: { nodeServer: NodeServer, filter?: NodeServerFileFilter }) {}
}

export class Delete {
  static readonly type = "[NodeServer] Delete a file";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class Copy {
  static readonly type = "[NodeServer] Copy a file";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class Move {
  static readonly type = "[NodeServer] Move a file";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class CreateFolder {
  static readonly type = "[NodeServer] Create a new folder";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class UploadFiles {
  static readonly type = "[NodeServer] Upload files";
  constructor(public payload: { nodeServer: NodeServer, files: File[] }) {}
}

export class DownloadBackup {
  static readonly type = "[NodeServer] Download backup root files";
  constructor() {}
}

export class DownloadFolder {
  static readonly type = "[NodeServer] Download folder";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

export class DownloadFile {
  static readonly type = "[NodeServer] Download file";
  constructor(public payload: { nodeServer: NodeServer }) {}
}

/* Web sockets */
export class SubscribeNodeServerWS {
  static readonly type = "[NodeServer] Suscribe nodeServer WS";
}

export class UnSubscribeNodeServerWS {
  static readonly type = "[NodeServer] UnSuscribe nodeServer WS";
}