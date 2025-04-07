import { HudConfig } from './types/HudTypes';

// Deciding if its better to have a const or dynamically read from csv and display everything
// Autonomy for user is probably better: 
// user can choose what to display through the launch config should directly be effected

//display types : [gauge, linear, graph]
//intialize value equal to min

export const liveLaunchHudConfig: HudConfig[] = [
  {
    dataName: 'Fuel-Tank',
    dataCol: 1,
    min: 0,
    max: 600,
    value: 0, 
    secondDisplayType: 'graph',
    units: '%',
  },
  {
    dataName: 'Ox Tank',
    dataCol: 2,
    min: 0,
    max: 600,
    value: 0,
    secondDisplayType: 'graph',
    units: 'L/min',
  },
  {
    dataName: 'Throttle Cavity',
    dataCol: 3, 
    min: -20,
    max: 150,
    value: 0, 
    secondDisplayType: 'gauge',
    units: 'psi',
  },
]

export const staticLaunchHudConfig: HudConfig[] = [
]