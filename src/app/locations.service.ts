import { Injectable } from '@angular/core';
import { Coordinates } from './coordinates.model';
import { Location } from './location.model';
import { BehaviorSubject } from 'rxjs';
import { greatCircleDistanceBetween, enableNextLocation, randomizeLocations } from './location.utils';

import { INITIAL_LOCATIONS } from './initial-locations.data';

const LOCATIONS_KEY = 'fun.spiessrelay.locations';

@Injectable()
export class LocationsService {
  protected _locations: Location[] = [];
  readonly locations$ = new BehaviorSubject<Location[]>([]);
  readonly formatted_latitude$ = new BehaviorSubject<string>('');
  readonly formatted_longitude$ = new BehaviorSubject<string>('');

  private current_location: Coordinates;

  constructor() {
    this.initializeLocationsList();
  }

  // ONLY USE THIS GETTER
  private get locations() {
    return this._locations;
  }

  // ONLY USE THIS SETTER
  private set locations(loc: Location[]) {
    this._locations = loc;
    this.locations$.next(loc);
  }

  resetLocations() {
    window.localStorage.clear();
    this.locations = randomizeLocations(INITIAL_LOCATIONS.map((l: Location) => ({ ...l, enabled: false })));
    this.persistLocationsToLocalStorage();
    window.location.reload();
  }

  private initializeLocationsList() {
    const local_storage_contents = window.localStorage.getItem(LOCATIONS_KEY);

    if (!local_storage_contents) {
      console.log('[LocationsService] locations array doesn\'t exist, creating...')
      this.locations = INITIAL_LOCATIONS;
      this.persistLocationsToLocalStorage();
    } else {
      const locations = JSON.parse(local_storage_contents);
      console.log('[LocationsService] populating service with existing locations from localStorage...');
      this.locations = locations;
    }
  }

  private persistLocationsToLocalStorage() {
    console.log('[LocationsService] persisting locations list to localStorage');
    window.localStorage.setItem(LOCATIONS_KEY, JSON.stringify(this.locations));
  }

  private formatLatitude(lat: number): string {
    if (lat < 0) {
      return Math.abs(lat).toFixed(5) + '\u00B0S'
    } else {
      return Math.abs(lat).toFixed(5) + '\u00B0N'
    }
  }

  private formatLongitude(lng: number): string {
    if (lng < 0) {
      return Math.abs(lng).toFixed(5) + '\u00B0W'
    } else {
      return Math.abs(lng).toFixed(5) + '\u00B0E'
    }
  }


  currentLocationChanged(current_location: Coordinates) {
    this.current_location = current_location;

    console.log(`[LocationsService] current location changed to (${current_location.latitude}, ${current_location.longitude})`);

    this.formatted_latitude$.next(this.formatLatitude(this.current_location.latitude));
    this.formatted_longitude$.next(this.formatLongitude(this.current_location.longitude));

    // check list of locations to see whether we are close to any & mark them as visited
    this.locations = this.locations
      .map((location) => ({
        ...location, // make sure we map through ALL of the locations every time
        distance: greatCircleDistanceBetween(this.current_location, location.coordinates)
      }))
      .map((location) => {
        if (location.coordinates) {
          const within_radius_of_location = location.distance <= 0.050; // within 50m

          // you should only be able to "visit" locations that are enabled: if you go to them before reading the clues
          // we should NOT mark them as visited OR nearby

          if (location.enabled) {
            const visited = location.visited || within_radius_of_location; // within 50m
            const nearby = location.distance <= 0.5; // within 500m

            let visited_at = location.visited_at;
            if (visited && !location.visited) {
              visited_at = new Date().toString();
            }

            return {
              ...location,
              visited,
              visited_at,
              nearby
            };
          }
        }

        return location;
      });

    // if we don't have an enabled, unvisited location, enable one
    const has_enabled_unvisited_location = this.locations.filter((l: Location) => l.enabled && !l.visited).length;
    if (!has_enabled_unvisited_location) {
      console.log('[LocationsService] will pick another location to enable');
      this.locations = enableNextLocation(this.locations);
      console.log(this.locations)
    }

    this.persistLocationsToLocalStorage();
  }
}
