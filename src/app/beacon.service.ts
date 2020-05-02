import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from './coordinates.model';
import { v4 as uuidv4 } from 'uuid';

const BEACON_KEY = 'fun.spiessrelay.beacon';
const API_ROOT = 'https://crabl-spiessrelay.builtwithdark.com';
const API_KEY = 'secret';

@Injectable()
export class BeaconService {
  private device_beacon: string;

  constructor(private HttpClient: HttpClient) {
    this.initializeDeviceBeacon();
  }

  // allow the debugging mode to regen the beacon
  regenerateDeviceBeacon() {
    const device_beacon = uuidv4();
    window.localStorage.setItem(BEACON_KEY, device_beacon);
  }

  private initializeDeviceBeacon() {
    const device_beacon = window.localStorage.getItem(BEACON_KEY);

    if (!device_beacon) {
      console.log('[BeaconService] device beacon does not exist, generating...')
      this.regenerateDeviceBeacon();
    } else {
      console.log('[BeaconService] populating device beacon from localStorage...');
      this.device_beacon = device_beacon;
    }
  }

  ping(coordinates: Coordinates) {
    return this.HttpClient.post(API_ROOT + '/beacon/' + API_KEY, {
      device_beacon: this.device_beacon,
      latitide: coordinates.latitude,
      longitude: coordinates.longitude,
      timestamp: new Date().toISOString()
    }).toPromise().then(() => {}, () => {});
  }

  getAllBeacons() {
    return this.HttpClient.get(API_ROOT + '/latest/' + API_KEY).toPromise();
  }
}
