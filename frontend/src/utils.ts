
export function calculatePixelHeight(normalizedValue: number) {
  // Get the screen height (in pixels)
  const screenHeight = window.innerHeight;
  // Calculate and return the pixel height
  return screenHeight * normalizedValue;
}

import { HudConfig } from './types/HudTypes';

//display types : [gauge, linear, graph]
//intialize value equal to min
export const liveLaunchHudConfig: HudConfig[] = [
  {
    dataName: 'Fuel-Tank',
    min: 0,
    max: 100,
    value: 0, 
    secondDisplayType: 'graph',
    units: '%',
  },
  {
    dataName: 'Fuel-Flow',
    min: 0,
    max: 100,
    value: 0,
    secondDisplayType: 'graph',
    units: 'L/min',
  },
  {
    dataName: 'Fuel-Pressure',
    min: 0,
    max: 100,
    value: 0, 
    secondDisplayType: 'gauge',
    units: 'psi',
  },
]

export const staticLaunchHudConfig: HudConfig[] = [
]