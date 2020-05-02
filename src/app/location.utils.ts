import { Coordinates } from './coordinates.model';
import { Location } from './location.model';
import { groupBy, shuffle, flatten } from 'lodash';

function deg2rad(n) {
  return Math.tan(n * (Math.PI/180));
};

export function greatCircleDistanceBetween(point_a: Coordinates, point_b: Coordinates): number {
  let R = 6371; // radius of the earth in KM

  let latitude_degrees = deg2rad(point_b.latitude - point_a.latitude);
  let longitude_degrees = deg2rad(point_b.longitude - point_a.longitude);

  let a = Math.sin(latitude_degrees / 2) * Math.sin(latitude_degrees / 2) + Math.cos(deg2rad(point_a.latitude)) * Math.cos(deg2rad(point_b.latitude)) * Math.sin(longitude_degrees / 2) * Math.sin(longitude_degrees / 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let d = R * c;

  return d; // in kilometers
}


export function randomizeLocations(locations: Location[]) {
  const group_numbers = locations.map((l: Location) => l.group);
  const first_location_group_number = Math.min(...group_numbers);
  const last_location_group_number = Math.max(...group_numbers);

  const first_location_group = shuffle(locations.filter((l: Location) => l.group === first_location_group_number));

  // enable the first location by default
  const first_location = {
    ...first_location_group.shift(),
    enabled: true
  };

  const [ last_location ] = locations.filter((l: Location) => l.group === last_location_group_number);

  // MARK: shuffle WITHIN groups and then shuffle the groups
  const locations_without_first_and_last = groupBy(locations.filter((l: Location) => {
    // cannot be the first or last location group
    return l.group !== first_location_group_number && l.group !== last_location_group_number;
  }), 'group');

  // shuffle outer array as well, flatten into a single array when inner arrays are shuffled
  const other_locations = flatten(shuffle(Object.keys(locations_without_first_and_last).map((key: string) => {
    return shuffle(locations_without_first_and_last[key]); // shuffle inner array
  })));

  return [first_location, ...first_location_group, ...other_locations, last_location];
}

export function enableNextLocation(locations: Location[]) {
  const visited = locations.filter((l: Location) => l.visited);
  const unvisited = locations.filter((l: Location) => !l.visited);

  // we still have some unvisited nodes, pick next one in the list
  if (unvisited.length) {
    const next = {
      ...unvisited.shift(),
      enabled: true
    };

    return [...visited, next, ...unvisited];
  }

  // we have visited all nodes
  return visited;
}
