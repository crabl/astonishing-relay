import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
import { Location } from '../location.model';
import { Coordinates } from '../coordinates.model';
import { Observable } from 'rxjs';
import { LocationsService } from '../locations.service';
import { BeaconService } from '../beacon.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { isEqual } from 'lodash';
import { WinStateComponent } from '../win-state/win-state.component';

@Component({
  selector: 'app-gameplay',
  template: `
    <div style="text-align:center" class="content">
      <div class="logo" (click)="resetLocations()">
        <span class="logo__top">THE ASTONISHING</span>
        <span class="logo__middle">RELAY</span>
        <span class="logo__bottom">LETHBRIDGE, AB</span>
      </div>

      <div class="current-location" *ngIf="location_services_enabled && this.current_location">
        <span style="color: #fff; margin-right: 8px;"><mat-icon [inline]="true">gps_fixed</mat-icon> </span> <span>{{ formatted_latitude$ | async }}, {{ formatted_longitude$ | async }}</span>
      </div>

      <div class="current-location current-location--disabled" *ngIf="!location_services_enabled || !this.current_location" (click)="requestCurrentLocation()">
        <span style="color: #fff; margin-right: 8px;"><mat-icon [inline]="true">gps_off</mat-icon> </span> <span style="color: #fff">LOCATION SERVICES NOT AVAILABLE</span>
      </div>

      <div class="locations">
        <div class="location" [ngClass]="{ 'location--enabled': !location.enabled && !location.visited, 'location--visited': location.visited }" *ngFor="let location of locations$ | async" (click)="openLocationDialog(location)">
          <div class="location__number">
            <mat-icon *ngIf="location.visited">check</mat-icon>
            <mat-icon *ngIf="location.enabled && !location.visited && !location.nearby">outlined_flag</mat-icon>
            <mat-icon *ngIf="!location.enabled">block</mat-icon>
            <mat-icon *ngIf="location.enabled && location.nearby && !location.visited">near_me_outline</mat-icon>
          </div>

          <div class="location__clue">
            <!-- should show the clue if we have the location enabled and not visited, should show the actual name if the location was visited -->
            <span *ngIf="!location.visited">{{ location.secret_name }}</span>
            <span *ngIf="!location.visited && location.enabled && location.nearby" style="color: #fff !important; font-size: 12px; line-height: 18px;">{{location.distance * 1000 | number: '1.0-0'}}m away</span>
            <span *ngIf="location.visited">{{ location.actual_name }}</span>
            <span *ngIf="location.visited" style="color: #fff !important; font-size: 12px; line-height: 18px;">{{ location.visited_at | date:'mediumTime' }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .content {
      background-color: #f7c41f;
      padding-top: 4px;
    }

    .logo {
      width: 150px;
      margin: 8px auto;
      padding: 8px;
      background: #000;
      display: flex;
      flex-direction: column;
    }

    .logo__top {
      color: #fff;
      letter-spacing: 2px;
      font-size: 10px;
      font-weight: 600;
    }

    .logo__middle {
      color: #f7c41f;
      font-size: 32px;
      letter-spacing: 3px;
      font-weight: 900;
    }

    .logo__bottom {
      line-height: 5px;
      color: #fff;
      letter-spacing: 3px;
      font-size: 10px;
      font-weight: 600;
    }

    .current-location {
      background: #000;
      color: #f7c41f;
      display: flex;
      padding: 8px 8px 2px 8px;
      justify-content: center;
    }

    .current-location--disabled {
      background: #f71f52 !important;
    }

    .locations {
      border: 8px solid #333;
      background: #333;
      color: #f7c41f;
    }

    .location {
      background: #121212;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }

    /* .location:not(:last-child) {
      border-bottom: 1px solid #857545;
    } */

    .location__number {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      width: 50px;
      height: 50px;
      background-color: #f7c41f;
      color: #000;
      margin: 8px;
    }

    /* actually this is location--disabled */
    .location--enabled {
      background: #222;
      color: #9e9578;
    }

    .location--enabled .location__number {
      background-color: #9e9578;
    }

    .location--visited {
      background: #121212;
      color: #08dba9;
    }

    .location--visited .location__number {
      background-color: #08dba9;
    }

    .location__clue {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 8px;
    }
  `]
})
export class GameplayComponent implements OnInit {
  location_services_enabled = false;
  current_location: Coordinates = null;
  locations$: Observable<Location[]>;
  formatted_latitude$: Observable<string>;
  formatted_longitude$: Observable<string>;

  constructor(private MatDialog: MatDialog, private LocationsService: LocationsService, private BeaconService: BeaconService) {
    this.locations$ = this.LocationsService.locations$.asObservable();
    this.formatted_latitude$ = this.LocationsService.formatted_latitude$.asObservable();
    this.formatted_longitude$ = this.LocationsService.formatted_longitude$.asObservable();
  }

  // TODO: REMOVE ME
  resetLocations() {
    // this.LocationsService.resetLocations();
    // this.BeaconService.regenerateDeviceBeacon();
  }

  ngOnInit() {
    // safari will only allow this on https
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        frequency: 5000,
        timeout: 15000,
        maximumAge: 0
      };

      navigator.geolocation.watchPosition((position: Position) => this.locationUpdateReceived(position), (error) => {
        this.location_services_enabled = false;
      }, options);
    }

    this.locations$.pipe(distinctUntilChanged(isEqual)).subscribe((locations: Location[]) => {
      if (locations.every((l: Location) => l.visited_at)) {

        const visit_times = locations.map((l: Location) => l.visited_at).sort();
        const earliest = visit_times[0];
        const latest = visit_times[visit_times.length - 1];

        var seconds = Math.floor(((new Date(latest) as any) - (new Date(earliest) as any))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);

        hours = hours-(days*24);
        minutes = minutes-(days*24*60)-(hours*60);
        seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

        setTimeout(() => {
          document.body.classList.add('modal-open');
          const dialog_ref = this.MatDialog.open(WinStateComponent);
          dialog_ref.componentInstance.minutes = minutes;
          dialog_ref.componentInstance.seconds = seconds;
          dialog_ref.afterClosed().subscribe(() => document.body.classList.remove('modal-open'));
        }, 1000)

      }
    });
  }

  requestCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.locationUpdateReceived(position);
      });
    }
  }

  locationUpdateReceived(position: Position) {
    this.location_services_enabled = true;
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    this.current_location = {
      latitude: lat,
      longitude: lng
    };

    this.LocationsService.currentLocationChanged(this.current_location);
    this.BeaconService.ping(this.current_location);
  }

  openLocationDialog(location: Location) {
    if (location.enabled) {
      document.body.classList.add('modal-open');
      const dialog_ref = this.MatDialog.open(LocationDialogComponent);
      dialog_ref.componentInstance.textClue = location.text_clue;
      dialog_ref.componentInstance.visualClue = location.visual_clue;

      dialog_ref.afterClosed().subscribe(() => document.body.classList.remove('modal-open'));
    } else {
      this.requestCurrentLocation();
    }
  }
}
