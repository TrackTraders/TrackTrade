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
  googleLogIn: async (user) => {
    return await service.post('/google/auth', user);
  },
  facebookLogIn: async (user) => {
    return await service.post('/facebook/auth', user);
  }
};

export default actions;
