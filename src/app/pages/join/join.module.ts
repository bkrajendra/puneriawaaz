import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinPageRoutingModule } from './join-routing.module';

import { JoinPage } from './join.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JoinPageRoutingModule
  ],
  declarations: [JoinPage]
})
export class JoinPageModule {}
