import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeServerComponent } from './components/node-server/node-server.component';
import { ScoAngularComponentsModule, ScoJoinPipe } from 'sco-angular-components';
import { NodeServerService } from './node-server.service';
import { NodeServerState } from './store/node-server.state';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScoAngularComponentsModule,
    SharedModule,
    NgxsModule.forFeature(
      [
        NodeServerState
      ]
    )
  ],
  declarations: [
    NodeServerComponent,
  ],
  exports: [
    NodeServerComponent,
  ],
  providers:[
    NodeServerService,
    ScoJoinPipe,
  ]
})
export class NodeServerModule { }
