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
    let user = await service.get('/is-logged-in');
    console.log(user)
    return user
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
  updateIdea: async (trade) => {
    return await service.post('/updateIdea', trade);
  },
  postTrade: async (trade) => {
    return await service.post('/postTrade', trade);
  },
  getIdeas: async () => {
    return await service.get('/get-ideas');
  },
  getAllIdeas: async () => {
    return await service.get('/get-all-ideas');
  },
  getTrades: async () => {
    return await service.get('/get-trades');
  },
  getAllTrades: async () => {
    return await service.get('/get-all-trades');
  },
  deleteIdeas: async (id) => {
    return await service.post('/delete-ideas', id);
  },
  deleteTrades: async (id) => {
    return await service.post('/delete-trades', id);
  },
  updateAvatar: async (theFile) => {
    return await service.post('/updateAvatar', theFile)
      .then(res => res.data)
      .catch(err => console.error(err));
  },
  handleIdeaUpload: async (theFile) => {
    return await service.post('/ideaUpload', theFile)
      .then(res => res.data)
      .catch(err => console.error(err));
  },
  handleTradeUpload: async (theFile) => {
    return await service.post('/tradeUpload', theFile)
      .then(res => res.data)
      .catch(err => console.error(err));
  },
  findOtherProfile: async (username) => {
    return await service.post('/find-other-profile', username);
  },
  getAllTraders: async () => {
    return await service.get('/get-all-traders');
  },
};

export default actions;
