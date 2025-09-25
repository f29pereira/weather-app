# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
- [Author](#author)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots

- Search for weather information by entering a location in the search bar
  ![search field](public/images/readme/search.png)

- If the searched location is invalid, show no results
  ![search not found](public/images/readme/search_not_found.png)

- If any error occurs during data fetching, show error message
  ![error during search](public/images/readme/api_error.png)

- If the searched location is valid, show loading state while fetching data
  ![loading data](public/images/readme/loading.png)

- View current weather conditions including:

  1. temperature, weather icon, and location details
  2. weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts

  ![temperature data](public/images/readme/weather_conditions.png)

- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
  ![seven day forecast data](public/images/readme/7_day_forecast.png)

- View an hourly forecast showing temperature changes throughout the day
  ![hourly forecast data](public/images/readme/hourly_forecast.png)

- Switch between different days of the week using the day selector in the hourly forecast section
  ![hourly forecast day selection](public/images/readme/hourly_forecast_day_selection.png)

- Toggle between Imperial and Metric measurement units via the units dropdown

  ![units toggle](public/images/readme/toggle_units.png)

- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown

  1. Metric Units (default)
     ![metric units](public/images/readme/weather_now_metric.png)

  2. Imperial Units
     ![imperial units](public/images/readme/weather_now_imperial.png)

- View the optimal layout for the interface depending on their device's screen size

  1. Mobile layout
     ![mobile layout](public/images/readme/weather_now_mobile.png)

  2. Desktop layout
     ![desktop layout](public/images/readme/weather_now_desktop.png)

- See hover and focus states for all interactive elements on the page

  1. Search Button
     ![search button hover state](public/images/readme/hover/search_button.png)

  2. Retry Button
     ![retry button hover state](public/images/readme/hover/retry_button.png)

  3. Metric/Imperial Toggle

     ![unit toggle hover state](public/images/readme/hover/unit_toggle.png)

  4. Hourly Day forecast Toggle

     ![forecast day toggle](public/images/readme/hover/day_toggle.png)

### Links

- Solution URL: [https://github.com/f29pereira/weather-app](https://github.com/f29pereira/weather-app)
- Live Site URL: [f29pereira.github.io/weather-app/](f29pereira.github.io/weather-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework

## Author

- Frontend Mentor - [@f29pereira](https://www.frontendmentor.io/profile/f29pereira)
