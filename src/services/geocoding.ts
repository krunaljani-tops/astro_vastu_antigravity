export interface GeoPlace {
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  timezone: number; // offset in hours e.g. +5.5
  country: string;
}

// Built-in instant high-accuracy lookup for major cities
export const PRESET_CITIES: GeoPlace[] = [
  { name: 'New Delhi', formattedAddress: 'New Delhi, Delhi, India', latitude: 28.6139, longitude: 77.2090, timezone: 5.5, country: 'India' },
  { name: 'Mumbai', formattedAddress: 'Mumbai, Maharashtra, India', latitude: 19.0760, longitude: 72.8777, timezone: 5.5, country: 'India' },
  { name: 'Bengaluru', formattedAddress: 'Bengaluru, Karnataka, India', latitude: 12.9716, longitude: 77.5946, timezone: 5.5, country: 'India' },
  { name: 'Chennai', formattedAddress: 'Chennai, Tamil Nadu, India', latitude: 13.0827, longitude: 80.2707, timezone: 5.5, country: 'India' },
  { name: 'Kolkata', formattedAddress: 'Kolkata, West Bengal, India', latitude: 22.5726, longitude: 88.3639, timezone: 5.5, country: 'India' },
  { name: 'Hyderabad', formattedAddress: 'Hyderabad, Telangana, India', latitude: 17.3850, longitude: 78.4867, timezone: 5.5, country: 'India' },
  { name: 'Ahmedabad', formattedAddress: 'Ahmedabad, Gujarat, India', latitude: 23.0225, longitude: 72.5714, timezone: 5.5, country: 'India' },
  { name: 'Pune', formattedAddress: 'Pune, Maharashtra, India', latitude: 18.5204, longitude: 73.8567, timezone: 5.5, country: 'India' },
  { name: 'Jaipur', formattedAddress: 'Jaipur, Rajasthan, India', latitude: 26.9124, longitude: 75.7873, timezone: 5.5, country: 'India' },
  { name: 'Varanasi', formattedAddress: 'Varanasi, Uttar Pradesh, India', latitude: 25.3176, longitude: 82.9739, timezone: 5.5, country: 'India' },
  { name: 'Haridwar', formattedAddress: 'Haridwar, Uttarakhand, India', latitude: 29.9457, longitude: 78.1642, timezone: 5.5, country: 'India' },
  { name: 'London', formattedAddress: 'London, Greater London, United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 0, country: 'United Kingdom' },
  { name: 'New York', formattedAddress: 'New York City, NY, USA', latitude: 40.7128, longitude: -74.0060, timezone: -5, country: 'United States' },
  { name: 'San Francisco', formattedAddress: 'San Francisco, CA, USA', latitude: 37.7749, longitude: -122.4194, timezone: -8, country: 'United States' },
  { name: 'Singapore', formattedAddress: 'Singapore', latitude: 1.3521, longitude: 103.8198, timezone: 8, country: 'Singapore' },
  { name: 'Dubai', formattedAddress: 'Dubai, United Arab Emirates', latitude: 25.2048, longitude: 55.2708, timezone: 4, country: 'United Arab Emirates' },
  { name: 'Sydney', formattedAddress: 'Sydney, New South Wales, Australia', latitude: -33.8688, longitude: 151.2093, timezone: 10, country: 'Australia' },
  { name: 'Toronto', formattedAddress: 'Toronto, Ontario, Canada', latitude: 43.6532, longitude: -79.3832, timezone: -5, country: 'Canada' },
];

export async function searchPlaces(query: string): Promise<GeoPlace[]> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  // Match preset cities first
  const matches = PRESET_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(cleanQuery) ||
      c.formattedAddress.toLowerCase().includes(cleanQuery)
  );

  if (matches.length >= 3) {
    return matches;
  }

  // Try OpenStreetMap Nominatim for additional global geocoding
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          'User-Agent': 'AstroVastuAI/1.0 (contact@astrovastu.ai)',
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      const onlineMatches: GeoPlace[] = data.map((item: any) => {
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);

        // Approximate timezone from longitude (lon / 15) rounded to nearest 0.5 hr if country is India or standard
        let tz = Math.round((lon / 15) * 2) / 2;
        if (item.address?.country_code === 'in') {
          tz = 5.5;
        }

        return {
          name: item.name || item.display_name.split(',')[0],
          formattedAddress: item.display_name,
          latitude: lat,
          longitude: lon,
          timezone: tz,
          country: item.address?.country || '',
        };
      });

      // Merge avoiding duplicates
      const all = [...matches];
      for (const om of onlineMatches) {
        if (!all.some((p) => Math.abs(p.latitude - om.latitude) < 0.1 && Math.abs(p.longitude - om.longitude) < 0.1)) {
          all.push(om);
        }
      }
      return all;
    }
  } catch (err) {
    // If offline/network failed, fall back safely to preset matches
  }

  return matches;
}
