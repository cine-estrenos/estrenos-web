export const getChainIds = (cinemas) => {
  return cinemas.reduce((acc, cinema) => ({ ...acc, [cinema.chain]: [...(acc[cinema.chain] || []), cinema.id] }), {});
};

export const getAvailableCinemas = (cinemas, shows) => {
  return cinemas.filter((cinema) => shows.some(({ cinemaId }) => cinemaId === cinema.id));
};

export const getChainsNames = (cinemas) => {
  return [...new Set(cinemas.map(({ chain }) => chain))].map((chain) => ({ chain }));
};

export const getAvailableBranches = (selectedCinema, availableCinemas) => {
  if (!selectedCinema.length) return [];
  return availableCinemas.filter((cinema) => cinema.chain === selectedCinema[0].chain);
};
