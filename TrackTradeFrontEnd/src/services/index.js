import axios from 'axios';
let baseURL;

console.log('client ')

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = 'https://tracktrade.herokuapp.com')
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in');
  },
  signUp: async (user) => {
    return await service.post('/sign-up', user);
  },
  logIn: async (user) => {
    return await service.post('/log-in', user);
  },
  logOut: async () => {
    return await service.get('/log-out');
  },
  postIdea: async (trade) => {
    return await service.post('/postIdea', trade);
  },
  postTrade: async (trade) => {
    return await service.post('/postTrade', trade);
  },
  getIdeas: async () => {
    return await service.get('/get-ideas');
  },
  getTrades: async () => {
    return await service.get('/get-trades');
  },
  deleteIdeas: async (id) => {
    return await service.post('/delete-ideas', id);
  },
  deleteTrades: async (id) => {
    return await service.post('/delete-trades', id);
  },
  changeAvatar: async (trade) => {
    return await service.post('/postTrade', trade);
  },
};

export default actions;
