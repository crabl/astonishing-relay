import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, tooltip } from 'leaflet';
import { BeaconService } from '../beacon.service';
// import { REPLAY_DATA } from '../../../data';
import { orderBy, uniq } from 'lodash';

// const all_data = REPLAY_DATA.filter(d => ["3b00ddf8-6b04-4c7d-98c3-468f6b718859", "3243f150-f289-4624-bd4d-fb52ece06c3a", "745d7d76-75cb-47bd-a56c-c11d79a882a7", "816e5ae6-528c-4a8c-979b-408c5753ca48", null].indexOf(d.device_beacon) === -1);
const all_data = [];

const timestamps = uniq(all_data.map(d => d.timestamp)).sort();
const beacons = uniq(all_data.map(d => d.device_beacon));

console.log(timestamps);

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
export class ReplayMapComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(49.685, -112.8489)
  };

  layers = [];
  beacons = [];
  timestamp_index = 0;
  last_reported = {}

  constructor(private NgZone: NgZone) { }

  requestBeaconsAtTimestamp() {
    console.log(timestamps[this.timestamp_index])
    const beacons_at_time = REPLAY_DATA.filter(d => d.timestamp === timestamps[this.timestamp_index]);
    this.timestamp_index++;

    this.NgZone.run(() => {
      this.layers = beacons.map((b: string) => {
        let current_beacon;
        const [at_time] = beacons_at_time.filter((t) => t.device_beacon === b);
        if (!at_time) {
          current_beacon = this.last_reported[b];
        } else {
          current_beacon = at_time;
        }

        this.last_reported[b] = current_beacon;

        if (current_beacon) {
          // return tooltip({permanent: true}).setContent(current_beacon.device_beacon).setLatLng({ lat: current_beacon.latitide, lng: current_beacon.longitude})

          return circle({ lat: current_beacon.latitide, lng: current_beacon.longitude }, { radius: 200 })
        }
        // return circle({ lat: b.latitide, lng: b.longitude}, { radius: 50 })
      }).filter(xs => !!xs);
    })

  }

  ngOnInit(): void {
    this.requestBeaconsAtTimestamp();

    setInterval(() => {
      this.requestBeaconsAtTimestamp()
    }, 50);
  }

}
