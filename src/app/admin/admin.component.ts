import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker  } from 'leaflet';
import { BeaconService } from '../beacon.service';

@Component({
  selector: 'app-admin',
  template: `
    <div style="height: 100vh; width: 100vw;"
      leaflet
      [leafletOptions]="options">
      <div *ngFor="let layer of layers" [leafletLayer]="layer"></div>
    </div>

    {{ beacons | json }}
  `,
  styles: [
  ]
})
export class AdminComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: latLng(49.7009, -112.8489)
  };

  layers = [];
  beacons = [];

  constructor(private BeaconService: BeaconService, private NgZone: NgZone) { }

  requestBeacons() {
    this.NgZone.run(() => {
      this.BeaconService.getAllBeacons().then((beacons: any[]) => {
        this.beacons = beacons;

        console.log(beacons)
          this.layers = beacons.map((b) => {

              return circle({ lat: b.latitide, lng: b.longitude}, { radius: 50 })


          }).filter(xs => !!xs);


      }, () => {})
  });
  }

  ngOnInit(): void {
    this.requestBeacons();
    setInterval(() => {
    this.requestBeacons()
  }, 5000);
  }

}
