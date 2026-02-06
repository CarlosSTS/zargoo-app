/**
 * Verifica se duas coordenadas estão dentro de um raio em metros.
 * @param lat1 Latitude do ponto atual
 * @param lon1 Longitude do ponto atual
 * @param lat2 Latitude do ponto de referência
 * @param lon2 Longitude do ponto de referência
 * @param radius Raio de tolerância em metros (default: 200)
 * @returns true se estiver dentro do raio, senão false
 */
const isWithinRadius = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  radius: number = 200,
) => {
  const R = 6371e3; // raio da Terra em metros
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= radius;
};

export default isWithinRadius;
