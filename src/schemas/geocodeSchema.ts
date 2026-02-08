import { z } from "zod";

export const geocodeItemSchema = z.object({
    name: z.string(),
    local_names: z.record(z.string(), z.string()).optional(),
    lat: z.number(),
    lon: z.number(),
    country: z.string(),
    state: z.string().optional(),
});

export const geocodeSchema = z.array(geocodeItemSchema);

export type GeocodeItem = z.infer<typeof geocodeItemSchema>;
export type GeocodeResponse = z.infer<typeof geocodeSchema>;
