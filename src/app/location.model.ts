import { Coordinates } from './coordinates.model';

export interface Location {
  location_number: number;
  coordinates: Coordinates;
  secret_name: string;
  actual_name: string;
  text_clue?: string;
  visual_clue?: string;
  visited: boolean;
  enabled: boolean;
  nearby: boolean;
  visited_at?: string;
  group?: number;
  distance?: number;
  cheat_code?: number;
}
