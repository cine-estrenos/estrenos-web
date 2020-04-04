export const getChainIds = (cinemas) => {
  return cinemas.reduce((acc, cinema) => ({ ...acc, [cinema.chain]: [...(acc[cinema.chain] || []), cinema.id] }), {});
};

export const getAvailableCinemas = (cinemas, shows) => {
  return cinemas.filter((cinema) => shows.some(({ cinemaId }) => cinemaId === cinema.id));
};

export const getCinemasChains = (cinemas) => {
  const chainsSet = new Set(cinemas.map(({ chain }) => chain));
  return Array.from(chainsSet);
};

export const getAvailableChains = (cinemas, shows) => {
  const allCinemasChains = getCinemasChains(cinemas);
  const availableCinemasChains = getCinemasChains(getAvailableCinemas(cinemas, shows));

  return allCinemasChains
    .map((chain) => ({ chain, isDisabled: !availableCinemasChains.includes(chain) }))
    .sort((a, b) => b.chain.localeCompare(a.chain));
};

export const getAvailableBranches = (selectedCinema, availableCinemas) => {
  if (!selectedCinema) return [];
  return availableCinemas.filter((cinema) => cinema.chain === selectedCinema);
};
