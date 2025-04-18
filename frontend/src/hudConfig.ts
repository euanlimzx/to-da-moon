import { HudConfig } from './types/HudTypes';

// Deciding if its better to have a const or dynamically read from csv and display everything
// Autonomy for user is probably better: 
// user can choose what to display through the launch config should directly be effected

//display types : [gauge, linear, graph]
//intialize value equal to min

export function formatSensorData(sensor_data : Record<string, number>): HudConfig[] {

  return [
    {
      dataName: 'Latitude',
      dataCol: 1,
      min: -90.0,
      max: 90.0,
      value: sensor_data.latitude,
      secondDisplayType: 'graph',
      units: '°',
    },
    {
      dataName: 'Longitude',
      dataCol: 2,
      min: -180.0,
      max: 180.0,
      value: sensor_data.longitude,
      secondDisplayType: 'graph',
      units: '°',
    },
    {
      dataName: 'Altitude (GPS)',
      dataCol: 3,
      min: -500.0,
      max: 10000.0,
      value: sensor_data.gps_altitude,
      secondDisplayType: 'graph',
      units: 'm',
    },
    {
      dataName: 'Heading',
      dataCol: 4,
      min: 0.0,
      max: 360.0,
      value: sensor_data.heading,
      secondDisplayType: 'graph',
      units: '°',
    },
    {
      dataName: 'Accel X',
      dataCol: 5,
      min: -20.0,
      max: 20.0,
      value: sensor_data.accelX,
      secondDisplayType: 'graph',
      units: 'm/s²',
    },
    {
      dataName: 'Accel Y',
      dataCol: 6,
      min: -20.0,
      max: 20.0,
      value: sensor_data.accelY,
      secondDisplayType: 'graph',
      units: 'm/s²',
    },
    {
      dataName: 'Accel Z',
      dataCol: 7,
      min: -20.0,
      max: 20.0,
      value: sensor_data.accelZ,
      secondDisplayType: 'graph',
      units: 'm/s²',
    },
    {
      dataName: 'Gyro X',
      dataCol: 8,
      min: -250.0,
      max: 250.0,
      value: sensor_data.gyroX,
      secondDisplayType: 'graph',
      units: '°/s',
    },
    {
      dataName: 'Gyro Y',
      dataCol: 9,
      min: -250.0,
      max: 250.0,
      value: sensor_data.gryoY,
      secondDisplayType: 'graph',
      units: '°/s',
    },
    {
      dataName: 'Gyro Z',
      dataCol: 10,
      min: -250.0,
      max: 250.0,
      value: sensor_data.gryoZ,
      secondDisplayType: 'graph',
      units: '°/s',
    },
    {
      dataName: 'Mag X',
      dataCol: 11,
      min: -100.0,
      max: 100.0,
      value: sensor_data.magX,
      secondDisplayType: 'graph',
      units: 'µT',
    },
    {
      dataName: 'Mag Y',
      dataCol: 12,
      min: -100.0,
      max: 100.0,
      value: sensor_data.magY,
      secondDisplayType: 'graph',
      units: 'µT',
    },
    {
      dataName: 'Mag Z',
      dataCol: 13,
      min: -100.0,
      max: 100.0,
      value: sensor_data.magZ,
      secondDisplayType: 'graph',
      units: 'µT',
    },
    {
      dataName: 'Pressure',
      dataCol: 14,
      min: 30.0,
      max: 200.0,
      value: sensor_data.pressure,
      secondDisplayType: 'graph',
      units: 'kPa',
    },
    {
      dataName: 'Altitude (BMP)',
      dataCol: 15,
      min: -500.0,
      max: 10000.0,
      value: sensor_data.bmp_altitude,
      secondDisplayType: 'graph',
      units: 'm',
    }
  ];
}

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