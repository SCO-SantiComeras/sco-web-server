import { Action, Selector, State, StateContext } from "@ngxs/store";
import { NodeServerFile } from "../model/node-server-file";
import { Injectable } from "@angular/core";
import { NodeServerService } from "../node-server.service";
import { ScoTranslateService } from "sco-angular-components";
import { HttpErrorsService } from "../../shared/http-error/http-errors.service";
import { Copy, Delete, Exists, IsDirectory, IsFile, List, Move, SubscribeNodeServerWS, UnSubscribeNodeServerWS } from "./node-server.actions";
import { catchError, map, tap } from "rxjs";

export class NodeServerStateModel {
  nodeServerFiles: NodeServerFile[];
  nodeServerFile: NodeServerFile;
  success: boolean;
  notifyChangeNodeServer: boolean;
  errorMsg: string;
  successMsg: string;
}

export const NodeServerStateDefault: NodeServerStateModel = {
  nodeServerFiles: [],
  nodeServerFile: undefined,
  success: false,
  notifyChangeNodeServer: false,
  errorMsg: '',
  successMsg: '',
};

@State<NodeServerStateModel>({
  name: "nodeserver",
  defaults: NodeServerStateDefault,
})

@Injectable()
export class NodeServerState {

  constructor(
    private readonly nodeServerService: NodeServerService,
    private readonly translateService: ScoTranslateService,
    private readonly httpErrorsService: HttpErrorsService,
  ) {}

  @Selector()
  static nodeServerFiles(state: NodeServerStateModel): NodeServerFile[] {
    return state.nodeServerFiles;
  }

  @Selector()
  static nodeServerFile(state: NodeServerStateModel): NodeServerFile {
    return state.nodeServerFile;
  }

  @Selector()
  static success(state: NodeServerStateModel): boolean {
    return state.success;
  }

  @Selector()
  static notifyChangeNodeServer(state: NodeServerStateModel): boolean {
    return state.notifyChangeNodeServer;
  }

  @Selector()
  static errorMsg(state: NodeServerStateModel): string {
    return state.errorMsg;
  }

  @Selector()
  static successMsg(state: NodeServerStateModel): string {
    return state.successMsg;
  }

  /* Functions */
  @Action(Exists)
  public exists(
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: Exists
  ) {
    return this.nodeServerService.exists(payload.nodeServer).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.node-server.state.exists.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.node-server.state.exists.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.node-server.state.exists.catch');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
      })
    );
  }

  @Action(IsDirectory)
  public isDirectory(
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: IsDirectory
  ) {
    return this.nodeServerService.isDirectory(payload.nodeServer).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.node-server.state.isDirectory.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.node-server.state.isDirectory.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.node-server.state.isDirectory.catch');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
      })
    );
  }

  @Action(IsFile)
  public isFile(
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: IsFile
  ) {
    return this.nodeServerService.isFile(payload.nodeServer).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.node-server.state.isFile.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.node-server.state.isFile.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.node-server.state.isFile.catch');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
      })
    );
  }
  
  @Action(List)
  public list (
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: List
  ) {
    return this.nodeServerService.list(payload.nodeServer).pipe(
      map((nodeServerFiles: NodeServerFile[]) => {
        if (nodeServerFiles && nodeServerFiles.length > 0) {
          patchState({
            nodeServerFiles: nodeServerFiles
          });
        } else {
          patchState({
            nodeServerFiles: []
          });
        }
      })
    );
  }

  @Action(Delete)
  public delete(
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: Delete
  ) {
    return this.nodeServerService.delete(payload.nodeServer).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.node-server.state.delete.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.node-server.state.delete.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.node-server.state.delete.catch');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
      })
    );
  }

  @Action(Copy)
  public copy(
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: Copy
  ) {
    return this.nodeServerService.copy(payload.nodeServer).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.node-server.state.copy.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.node-server.state.copy.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.node-server.state.copy.catch');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
      })
    );
  }

  @Action(Move)
  public move(
    { patchState }: StateContext<NodeServerStateModel>,
    { payload }: Move
  ) {
    return this.nodeServerService.move(payload.nodeServer).pipe(
      tap((result: boolean) => {
        if (result) {
          patchState({
            success: true,
            successMsg: this.translateService.getTranslate('label.node-server.state.move.success'),
          });
        } else {
          patchState({
            success: false,
            errorMsg: this.translateService.getTranslate('label.node-server.state.move.error'),
          });
        }
      }),
      catchError((error) => {
        let errorMsg: string = this.translateService.getTranslate('label.node-server.state.move.catch');
        if (this.httpErrorsService.getErrorMessage(error.error.message)) {
          errorMsg = this.httpErrorsService.getErrorMessage(error.error.message);
        }

        patchState({
          success: false,
          errorMsg: errorMsg,
        });
        throw new Error(error);
      })
    );
  }

  /* Web sockets */
  @Action(SubscribeNodeServerWS)
  public subscribeNodeServerWS(ctx: StateContext<NodeServerStateModel>) {
    return this.nodeServerService.getNodeserverChangesBySocket().pipe(
      map((change: boolean) => {
        if(change){
          let state = ctx.getState();

          state = {
            ...state,
            notifyChangeNodeServer: !state.notifyChangeNodeServer,
          };

          ctx.setState({
            ...state,
          });
        }
      })
    )
  }

  @Action(UnSubscribeNodeServerWS)
  public unSubscribeNodeServerWS(ctx: StateContext<NodeServerStateModel>) {
    this.nodeServerService.removeSocket();
  }
}

