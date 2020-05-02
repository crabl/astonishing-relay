import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { LocationsService } from './locations.service';
import { BeaconService } from './beacon.service';
import { GameplayComponent } from './gameplay/gameplay.component';
import { WinStateComponent } from './win-state/win-state.component';
import { AdminComponent } from './admin/admin.component';
// import { ReplayMapComponent } from './replay-map/replay-map.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationDialogComponent,
    GameplayComponent,
    WinStateComponent,
    AdminComponent,
    // ReplayMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [
    BeaconService,
    LocationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
