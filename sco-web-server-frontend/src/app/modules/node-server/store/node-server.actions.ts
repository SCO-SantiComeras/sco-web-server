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


/* Web sockets */
export class SubscribeNodeServerWS {
  static readonly type = "[NodeServer] Suscribe nodeServer WS";
}

export class UnSubscribeNodeServerWS {
  static readonly type = "[NodeServer] UnSuscribe nodeServer WS";
}