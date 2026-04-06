import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      // Default to Philadelphia (UPenn)
      setLocation({ lat: 39.9522, lng: -75.1932, name: "Philadelphia, PA" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let name = "";

        // Reverse geocode for city name
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          name = data.city || data.locality || data.principalSubdivision || "";
          if (data.countryCode) name += name ? `, ${data.countryCode}` : data.countryName;
        } catch {
          name = `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
        }

        setLocation({ lat: latitude, lng: longitude, name });
        setLoading(false);
      },
      () => {
        // Default to Philadelphia
        setLocation({ lat: 39.9522, lng: -75.1932, name: "Philadelphia, PA" });
        setError("Permission denied — using default location");
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  return { location, error, loading };
}
