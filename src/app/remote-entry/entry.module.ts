import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RemoteEntryComponent } from './entry.component';
// import { NxWelcomeComponent } from './nx-welcome.component';
import { remoteRoutes } from './entry.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import {LayoutModule} from "../modules/layout/layout.module";
import { AuthService } from '../core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuardService } from '../core/services/auth-guard.service';

@NgModule({
  declarations: [RemoteEntryComponent,
    NxWelcomeComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes), LayoutModule],
  providers: [
    DatePipe
  ],
})
export class RemoteEntryModule {}
