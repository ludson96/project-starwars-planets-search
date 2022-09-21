const ISS_API = 'https://swapi.dev/api/planets';

const getPlanets = async () => {
  const response = await fetch(ISS_API);
  const json = await response.json();
  return json;
};

export default getPlanets;
