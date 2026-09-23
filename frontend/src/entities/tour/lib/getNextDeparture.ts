export const getNextDeparture = (dates: string[], today: string) =>
  dates.filter((date) => date >= today).sort()[0];
