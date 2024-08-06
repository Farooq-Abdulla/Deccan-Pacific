const production = {
  url: 'https://backenddp.101xdev.com',
};
const development = {
  url: 'http://localhost:8000',
};
export const config =
  process.env.NODE_ENV === 'development' ? development : production;
