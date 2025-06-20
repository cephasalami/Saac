export interface Booth {
  id: string;
  name: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage
  height: number; // percentage
  supplierInfo: string;
}

export const booths: Booth[] = [
  {
    id: 'A1',
    name: 'AI Corp',
    x: 10,
    y: 10,
    width: 15,
    height: 20,
    supplierInfo: 'AI solutions provider',
  },
  {
    id: 'B2',
    name: 'Bot Labs',
    x: 35,
    y: 10,
    width: 15,
    height: 20,
    supplierInfo: 'Robotics showcase',
  },
  {
    id: 'C3',
    name: 'Cloud Nine',
    x: 60,
    y: 10,
    width: 15,
    height: 20,
    supplierInfo: 'Cloud services',
  },
];
