export const getMoviesByGenres = (movies) => {
  return movies.reduce((acc, movie) => {
    const { genres } = movie;
    const newAcc = { ...acc };

    genres.forEach(({ value }) => {
      newAcc[value] = [...(newAcc[value] || []), movie];
    });

    return newAcc;
  }, {});
};

export const getAvailableGenres = (movies) => Object.keys(movies).map((genre) => ({ genre }));

export const filterMoviesByGenre = (movies, selectedGenre) => {
  if (!selectedGenre || !selectedGenre.length) return movies;

  return movies.filter(({ genres }) => {
    const allGenres = genres.map(({ value }) => value);
    return allGenres.includes(selectedGenre);
  });
};
