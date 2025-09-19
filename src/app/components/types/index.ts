/**
 * Props for the UnitOption component
 */
export type UnitOptionProps = {
  //Unit description
  text: string;

  //Is Unit selected
  isSelected: boolean;
};

export type TemperatureProps = {
  //location
  location: string;

  //date
  date: string;

  //temperature value
  temperature: string;

  //feels like temperature value
  feelTemperature: string;

  //humidity
  humidity: string;

  //wind
  wind: string;

  //precipitation
  precipitation: string;
};
