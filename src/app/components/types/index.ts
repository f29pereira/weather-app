/**
 * Props for the UnitOption component
 */
export type UnitOptionProps = {
  //Unit description
  text: string;

  //Is Unit selected
  isSelected: boolean;
};

/**
 * Props for the Temperature component
 */
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

/**
 * Props for the DayForeCast component
 */
export type DayForeCastProps = {
  //day of the week
  day: string;

  //weather icon path
  imgTemp: string;

  //max temperature
  maxTemp: string;

  //min temperature
  minTemp: string;
};

/**
 * Props for the ForeCastList component
 */
export type ForeCastListProps = {
  //list of DayForeCast components
  foreCastList: DayForeCastProps[];
};
