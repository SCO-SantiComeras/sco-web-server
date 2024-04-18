import { UtilsService } from 'src/app/modules/shared/utils/utils.service';
import { cloneDeep } from 'lodash-es';
import { AppState } from './../../../../store/app.state';
import { Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ScoConstantsService, ScoDisplayResize, ScoModalService, ScoSpinnerService, ScoToastService, ScoTranslateService } from 'sco-angular-components';
import { NodeServerState } from '../../store/node-server.state';
import { NodeServerFile } from '../../model/node-server-file';
import { Copy, CreateFolder, Delete, DownloadBackup, DownloadFolder, IsDirectory, List, Move, SubscribeNodeServerWS, UnSubscribeNodeServerWS, UploadFiles } from '../../store/node-server.actions';
import { NodeServerFileFilter } from '../../model/node-server-file-filter';
import environment from 'src/environments/environment';
import { FILE_TYPES_CONSTANTS } from 'src/app/constants/file-types.constants';
import { NodeServerDownload } from '../../model/node-server-download';

@Component({
  selector: 'app-node-server',
  templateUrl: './node-server.component.html',
  styleUrls: ['./node-server.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NodeServerComponent implements OnInit, OnDestroy {

  @Select(AppState.scoDisplayResize) scoDisplayResize$: Observable<ScoDisplayResize>;
  public scoDisplayResize: ScoDisplayResize;

  private subManager: Subscription;
  @Select(NodeServerState.nodeServerFiles)
  nodeServerFiles$: Observable<NodeServerFile[]>;
  @Select(NodeServerState.notifyChangeNodeServer)
  notifyChangeNodeServer$: Observable<boolean>;

  /* List */
  public serverPath: string;
  public currentPath: string;
  public nodeServerFileFilter: NodeServerFileFilter;
  public nodeServerFiles: NodeServerFile[];

  /* New Folder Modal */
  public newFolderName: string;

  /* Delete File Modal */
  public selectedDeleteFile: NodeServerFile;

  /* Cut Item Action */
  public cutFileOriginPath: string;
  public selectedCutFile: NodeServerFile;

  /* Copy Item Action */
  public copyFileOriginPath: string;
  public selectedCopyFile: NodeServerFile;

  /* Filter File names */
  public filterFileNames: string;

  /* Filter Show Path */
  public showCurrentPath: string;

  /* Change View */
  public tableView: boolean;

  /* Actions Panel */
  public selectedActionPanelFile: NodeServerFile;
  
  constructor(
    private readonly store: Store,
    private readonly spinnerService: ScoSpinnerService,
    private readonly toastService: ScoToastService,
    private readonly modalService: ScoModalService,
    private readonly translateService: ScoTranslateService,
    private readonly utilsService: UtilsService,
    public readonly constantsService: ScoConstantsService,
  ) {
    this.subManager = new Subscription();

    this.subManager.add(this.scoDisplayResize$.subscribe((scoDisplayResize: ScoDisplayResize) => {
        this.scoDisplayResize = scoDisplayResize;
      },
    ));

    this.serverPath = `${environment.rootPath}/${environment.serverFolder}/`;
    this.currentPath = '/';
    this.nodeServerFileFilter = new NodeServerFileFilter();
    this.nodeServerFiles = [];

    this.newFolderName = '';

    this.selectedDeleteFile = undefined;

    this.cutFileOriginPath = '';
    this.selectedCutFile = undefined;

    this.copyFileOriginPath = '';
    this.selectedCopyFile = undefined;

    this.filterFileNames = '';

    this.showCurrentPath = this.currentPath;

    this.tableView = true;

    this.selectedActionPanelFile= undefined;
  }
  
  /* Angular Flow Functions */
  ngOnDestroy(): void {
    this.store.dispatch(new UnSubscribeNodeServerWS());
    this.subManager.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchNodeServerFiles();
    this.notifyChangeNodeServer();
  }

  /* Subscription To Node Server Files */
  notifyChangeNodeServer() {
    this.store.dispatch(new SubscribeNodeServerWS());
    this.subManager.add(this.notifyChangeNodeServer$.subscribe({
      next: () => {
        this.store.dispatch(new List({ nodeServer: { path: this.currentPath }, filter: this.nodeServerFileFilter}))
      }
    }));
  }

  fetchNodeServerFiles() {
    this.subManager.add(this.nodeServerFiles$.subscribe({
      next: () => {
        this.spinnerService.showSpinner();

        this.nodeServerFiles = [];
        if (
          this.store.selectSnapshot(NodeServerState.nodeServerFiles) 
          && this.store.selectSnapshot(NodeServerState.nodeServerFiles).length > 0
        ) {
          this.nodeServerFiles = cloneDeep(this.store.selectSnapshot(NodeServerState.nodeServerFiles));
        }

        this.spinnerService.hideSpinner(500);
      },
      error: () => {
        this.spinnerService.hideSpinner(500);
      },
    }));
  }

  filterPathList() {
    this.store.dispatch(new List({ nodeServer: { path: this.currentPath }, filter: this.nodeServerFileFilter}));
  }

  /* Header Actions */
  onLevelUpButton() {
    if (!this.currentPath || this.currentPath && this.currentPath.length == 0) {
      return;
    }

    if (this.currentPath == '/') {
      return;
    }

    const pathSplit: string[] = this.currentPath.split('/');
    let newPath: string = `/`;
    for (const split of pathSplit) {
      if (pathSplit.indexOf(split) == 0 || pathSplit.indexOf(split) == pathSplit.length-1) {
        continue;
      }

      newPath += split;
    }
    
    this.currentPath = newPath;
    this.showCurrentPath = this.currentPath;
    this.filterPathList();
  }

  onRefreshCurrentList() {
    this.filterPathList();
  }

  onClickHomeButton() {
    this.currentPath = '/';
    this.showCurrentPath = this.currentPath;
    this.onRefreshCurrentList();
  }

  /* Select Item Actions */
  onSelectItem(file: NodeServerFile, index: number) {
    if (!file) return;

    if (file.type == FILE_TYPES_CONSTANTS.FILE) {
      return;
    }

    if (this.currentPath.charAt(this.currentPath.length-1) == '/') {
      this.currentPath = this.currentPath + file.name;
    } else {
      this.currentPath = this.currentPath + `/${file.name}`;
    }
    this.showCurrentPath = this.currentPath;

    this.filterPathList();
  }

  /* Create Folder Actions */
  onClickCreateFolder() {
    this.newFolderName = '';
    this.modalService.open('create-folder-modal');
  }

  onCancelCreateFolderModal($event: MouseEvent) {
    this.newFolderName = '';
    this.modalService.close('create-folder-modal');
  }

  onConfirmCreateFolderModal($event: MouseEvent) {
    if (!this.newFolderName || this.newFolderName == '') {
      this.onCancelCreateFolderModal($event);
      return;
    }

    this.store.dispatch(new CreateFolder({ nodeServer: { path: `${this.currentPath}/${this.newFolderName}`, recursive: true } })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          
          this.onCancelCreateFolderModal($event);
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );
        this.onCancelCreateFolderModal($event);
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
        return;
      }
    })
  }

  /* Delete File Actions */
  onCancelDeleteFileModal($event: MouseEvent) {
    this.selectedDeleteFile = undefined;
    this.modalService.close('delete-file-modal');
  }

  onConfirmDeleteFileModal($event: MouseEvent) {
    let deletePath: string = `${this.currentPath}/${this.selectedDeleteFile.name}`;
    if (this.currentPath == '/') {
      deletePath = `${this.currentPath}${this.selectedDeleteFile.name}`;
    }

    this.store.dispatch(new Delete({ nodeServer: { path: deletePath, recursive: true } })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );
        this.selectedDeleteFile = undefined;
        this.modalService.close('delete-file-modal');
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
        return;
      }
    })
  }

  onDeleteItem(file: NodeServerFile, index: number) {
    this.selectedDeleteFile = file;
    this.modalService.open('delete-file-modal');
  }

  /* Cut File */
  onCutCopyFile(file: NodeServerFile, index: number) {
    this.copyFileOriginPath = undefined;
    this.selectedCopyFile = undefined;

    if (this.selectedCutFile != undefined && this.selectedCutFile.name == file.name) {
      this.cutFileOriginPath = undefined;
      this.selectedCutFile = undefined;
      return;
    }

    this.cutFileOriginPath = this.currentPath;
    this.selectedCutFile = file;
  }

  onCutPasteFile() {
    if (this.cutFileOriginPath == this.currentPath) {
      this.cutFileOriginPath = undefined;
      this.selectedCutFile = undefined;
      return;
    }

    let originPath: string = `${this.cutFileOriginPath}/${this.selectedCutFile.name}`;
    if (this.cutFileOriginPath == '/') {
      originPath = `${this.cutFileOriginPath}${this.selectedCutFile.name}`;
    }

    let destinyPath: string = `${this.currentPath}/${this.selectedCutFile.name}`;
    if (this.currentPath == '/') {
      destinyPath = `${this.currentPath}${this.selectedCutFile.name}`;
    }
    
    this.store.dispatch(new Move({ nodeServer: { path: originPath, newPath: destinyPath, recursive: true } })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );

        this.cutFileOriginPath = undefined;
        this.selectedCutFile = undefined;
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
        return;
      }
    })
  }

  /* Copy File */
  onCopyCopyFile(file: NodeServerFile, index: number) {
    this.cutFileOriginPath = undefined;
    this.selectedCutFile = undefined;

    if (this.selectedCopyFile != undefined && this.selectedCopyFile.name == file.name) {
      this.copyFileOriginPath = undefined;
      this.selectedCopyFile = undefined;
      return;
    }

    this.copyFileOriginPath = this.currentPath;
    this.selectedCopyFile = file;
  }

  onCopyPasteFile() {
    if (this.copyFileOriginPath == this.currentPath) {
      this.copyFileOriginPath = undefined;
      this.selectedCopyFile = undefined;
      return;
    }

    let originPath: string = `${this.copyFileOriginPath}/${this.selectedCopyFile.name}`;
    if (this.copyFileOriginPath == '/') {
      originPath = `${this.copyFileOriginPath}${this.selectedCopyFile.name}`;
    }

    let destinyPath: string = `${this.currentPath}/${this.selectedCopyFile.name}`;
    if (this.currentPath == '/') {
      destinyPath = `${this.currentPath}${this.selectedCopyFile.name}`;
    }
    
    this.store.dispatch(new Copy({ nodeServer: { path: originPath, newPath: destinyPath, recursive: true } })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );

        this.copyFileOriginPath = undefined;
        this.selectedCopyFile = undefined;
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
        return;
      }
    })
  }

  /* Upload Files */
  onSelectFiles(files: File[]) {
    if (!files || (files && files.length == 0)) {
      return;
    }

    this.store.dispatch(new UploadFiles({ nodeServer: { path: this.currentPath, recursive: true }, files: files })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );

        this.copyFileOriginPath = undefined;
        this.selectedCopyFile = undefined;
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
        return;
      }
    })
  }

  /* Filter File Names Actions  */
  onFilterFileNames($event: string) {
    this.filterFileNames = $event;
    this.nodeServerFileFilter.name = $event && $event.length > 0 ? $event : '';
  }

  onCleanFilterNames() {
    this.filterFileNames = '';
    this.nodeServerFileFilter.name = '';
    this.filterPathList();
  }

  /* Filter Current Path */
  onFilterCurrentPath() {
    if (!this.showCurrentPath || this.showCurrentPath == '') {
      this.showCurrentPath = '/';
    }

    if (this.showCurrentPath.charAt(0) != '/') {
      this.showCurrentPath = `/${this.showCurrentPath}`;
    }

    this.store.dispatch(new IsDirectory({ nodeServer: { path: this.showCurrentPath } })).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.showCurrentPath = this.currentPath;
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.currentPath = this.showCurrentPath;
        this.filterPathList();
      },
      error: () => {
        this.showCurrentPath = this.currentPath;
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
        return;
      }
    })
  }

  /* Actions Panel Actions */
  onCancelActionsPanelModal($event: boolean) {
    if (!$event) return;
    this.selectedActionPanelFile = undefined;
    this.modalService.close('actions-panel-file-modal');
  }

  onConfirmActionsPanelModal($event: boolean) {
    if (!$event) return;
    this.selectedActionPanelFile = undefined;
    this.modalService.close('actions-panel-file-modal');
  }

  /* Download Server Backup Actions */
  onDownloadServerBackup() {
    this.store.dispatch(new DownloadBackup()).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        const nodeServerDownload: NodeServerDownload = this.store.selectSnapshot(NodeServerState.nodeServerDownload);
        if (!nodeServerDownload) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.utilsService.downloadFile(nodeServerDownload.base64, nodeServerDownload.fileName);
        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
      }
    })
  }

  /* Download Files */
  onDownloadFile($event: NodeServerFile, index: number) {
    if ($event.type == 'd') {
      this.downloadFolder($event, index);
    } else {
      this.downloadFile($event, index);
    }
  }

  downloadFolder($event: NodeServerFile, index: number) {
    let downloadFolderPath: string = `${this.currentPath}/${$event.name}`;
    if (this.currentPath == '/') {
      downloadFolderPath = `${this.currentPath}${$event.name}`;
    }
    
    this.store.dispatch(new DownloadFolder({ nodeServer: { path: downloadFolderPath }})).subscribe({
      next: () => {
        const success: boolean = this.store.selectSnapshot(NodeServerState.success);
        if (!success) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        const nodeServerDownload: NodeServerDownload = this.store.selectSnapshot(NodeServerState.nodeServerDownload);
        if (!nodeServerDownload) {
          this.toastService.addErrorMessage(
            this.translateService.getTranslate('label.error'),
            this.store.selectSnapshot(NodeServerState.errorMsg),
          );
          return;
        }

        this.utilsService.downloadFile(nodeServerDownload.base64, nodeServerDownload.fileName);
        this.toastService.addSuccessMessage(
          this.translateService.getTranslate('label.success'),
          this.store.selectSnapshot(NodeServerState.successMsg),
        );
      },
      error: () => {
        this.toastService.addErrorMessage(
          this.translateService.getTranslate('label.error'),
          this.store.selectSnapshot(NodeServerState.errorMsg),
        );
      }
    })
  }

  downloadFile($event: NodeServerFile, index: number) {

  }

  /* Keyboard Events */
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (this.selectedDeleteFile || this.selectedActionPanelFile) return;
        this.onFilterCurrentPath();
        break;
      case 'Escape':
        if (this.selectedDeleteFile || this.selectedActionPanelFile) return;
        this.onCleanFilterNames();
        break;
      default:
        break;
    }
  }

  @HostListener('document:click')
  clickout() {
    if (this.selectedActionPanelFile) {
      this.selectedActionPanelFile = undefined;
      this.modalService.close('actions-panel-file-modal');
    }
  }

  @HostListener('contextmenu', ['$event'])
  async contextmenu(event: MouseEvent) {
    /* Prevent Default always to no open default options panel */
    event.preventDefault();
    event.stopPropagation();

    /* Code Here */
    const id: string = event.target['id'];
    if (!id || (id && id.length == 0)) {
      return false;
    }

    const splitId: string[] = id.split("-");
    if (!splitId || (splitId && splitId.length == 0)) {
      return false;
    }

    const index: number = Number.parseInt(splitId[splitId.length-1]);
    if (index < 0) {
      return false;
    }

    const nodeServerFile: NodeServerFile = this.nodeServerFiles[index];
    if (!nodeServerFile) {
      return false;
    }
    
    this.selectedActionPanelFile = nodeServerFile;
    this.modalService.open('actions-panel-file-modal');

    /* Return false always to no open default options panel */
    return false;
  }
}
