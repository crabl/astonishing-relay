import { randomizeLocations } from './location.utils';
import { Location } from './location.model';

const locations: Location[] = [{
  location_number: 1,
  group: 1,
  coordinates: {
    latitude: 49.6765,
    longitude: -112.8629
  },
  secret_name: 'Top Secret',
  actual_name: 'Aperture Sculpture @ U of L',
  text_clue: 'Round and round the busses go, at this place, the Pronghorns\' home',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 2,
  group: 1,
  coordinates: {
    latitude: 49.6709,
    longitude: -112.9124
  },
  secret_name: 'For Your Eyes Only... Soon',
  actual_name: 'Cor Van Raay YMCA',
  text_clue: `Young man, there\'s no need to feel down,\nI said, young man, pick yourself off the ground!`,
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 3,
  group: 1,
  coordinates: {
    latitude: 49.6920,
    longitude: -112.8927
  },
  secret_name: 'The Plot Thickens',
  actual_name: 'Westside Safeway',
  text_clue: 'This is the "safest" place to shop for groceries in West Lethbridge...',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 4,
  group: 3,
  coordinates: {
    latitude: 49.6798,
    longitude: -112.8299
  },
  secret_name: 'Cosmic Top Secret',
  actual_name: 'The Eternal Flame',
  text_clue: 'A torch that burns to honor those who have gone before... don\'t "pass on" this clue!',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 5,
  group: 2,
  coordinates: {
    latitude: 49.6992,
    longitude: -112.8604
  },
  secret_name: 'Place Name Redacted',
  actual_name: 'Helen Schuler Nature Centre',
  text_clue: 'Porcupines, beavers, and skunks! Come for the Nature, stay for the Centre?',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 6,
  group: 2,
  coordinates: {
    latitude: 49.6970,
    longitude: -112.8394
  },
  secret_name: 'Unnamed Island in the Pacific',
  actual_name: 'Galt Gardens',
  text_clue: 'Beside the Mall these Gardens sprawl: Jazz in summer, Shakespeare in fall',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 7,
  group: 2,
  coordinates: {
    latitude: 49.6942,
    longitude: -112.8329
  },
  secret_name: 'Highly Confidential',
  actual_name: 'City Hall',
  text_clue: 'A building shaped just like a "throne", the place Chris Spearman calls his own: between its walls the council works, while taxpayers moan and call them...',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 8,
  group: 2,
  coordinates: {
    latitude: 49.7077,
    longitude: -112.8245
  },
  secret_name: 'No Telling Where This Could Be',
  actual_name: 'St. Basil\'s Church',
  text_clue: 'The church named after the patron saint of Italian herb & spices (I think?)',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 9,
  group: 3,
  coordinates: {
    latitude: 49.6694,
    longitude: -112.8001
  },
  secret_name: 'Just Wait and See',
  actual_name: 'Wind Gauge',
  text_clue: 'It\'s so windy here, the tourists just blow straight through!',
  visual_clue: 'https://i.imgur.com/xdl1bjU.jpg',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}, {
  location_number: 10,
  group: 4, // final location MUST be the only one in its group
  coordinates: {
    latitude: 49.6877,
    longitude: -112.7894
  },
  secret_name: 'Location, Location, Location',
  actual_name: 'Cannons at Henderson Lake',
  text_clue: 'Around this lake, a runner runs, you\'ll find us there, between the guns!',
  visited: false,
  enabled: false,
  nearby: false,
  distance: Infinity
}];

export const INITIAL_LOCATIONS = randomizeLocations(locations);
console.log(INITIAL_LOCATIONS)


// import { uniq } from 'lodash';

// calculate all unique arrangements
/*
const arrangements = [];
for (let i = 0; i < 100000; i++) {
  let arrangement = randomizeLocations(locations).map((l: Location) => l.location_number);
  arrangements.push(arrangement.join(','));
}
console.log(uniq(arrangements));
*/
