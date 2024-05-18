const searchPopularAlbums = () => {
    const url = `https://itunes.apple.com/search?term=albums&entity=album&sort=popular&limit=57`;
    return fetch(url) // Agregar 'return' aquí
      .then((response) => response.json())
      .then((data) => {
        const json = data.results;
        return json;
      });
  };
const searchAlbums = (artist) => {
  const url = `https://itunes.apple.com/search?term=${artist}&entity=album&sort=popular&limit=57`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const json = data.results;
      return json;
    });
};

export {
    searchPopularAlbums,
    searchAlbums
};

