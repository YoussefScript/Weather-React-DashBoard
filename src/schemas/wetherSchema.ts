import { z } from "zod";

// Current weather schema
export const currentSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  humidity: z.number(),
  pressure: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  clouds: z.number(),
  weather: z.array(
    z.object({ id: z.number(), main: z.string(), description: z.string(), icon: z.string() })
  ),
  sunrise: z.number(),
  sunset: z.number(),
  timezone: z.number(),
  name: z.string(),
});

// Hourly forecast schema (from 3-hour forecast)
export const hourlySchema = z.array(
  z.object({
    dt: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    humidity: z.number(),
    pressure: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    clouds: z.number(),
    weather: z.array(
      z.object({ id: z.number(), main: z.string(), description: z.string(), icon: z.string() })
    ),
  })
);

// Daily forecast schema (calculated from 3-hour forecast)
export const dailySchema = z.array(
  z.object({
    dt: z.number(), // timestamp of the day
    temp: z.object({ min: z.number(), max: z.number() }),
    feels_like: z.object({ day: z.number(), night: z.number() }),
    humidity: z.number(),
    pressure: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    clouds: z.number(),
    weather: z.array(
      z.object({ id: z.number(), main: z.string(), description: z.string(), icon: z.string() })
    ),
  })
);

// Combined schema like One Call API
export const oneCallLikeSchema = z.object({
  current: currentSchema,
  hourly: hourlySchema,
  daily: dailySchema,
});

export type CurrentWeather = z.infer<typeof currentSchema>;
export type HourlyWeather = z.infer<typeof hourlySchema>[number];
export type DailyWeather = z.infer<typeof dailySchema>[number];
export type OneCallLike = z.infer<typeof oneCallLikeSchema>;
