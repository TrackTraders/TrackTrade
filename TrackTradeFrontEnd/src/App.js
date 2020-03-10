import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/home/Landing';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
// import PostTrade from './components'
import Profile from './components/profile/Profile'
import actions from './services/index'

class App extends Component {
  
  state = { }
  
  async componentDidMount() {
    let user = await actions.isLoggedIn()
    this.setState({...user.data})
    console.log('cool', user.data)
  }

  setUser = (user) => this.setState(user)
  
  logOut = async () => {
    let res = await actions.logOut()
    this.setUser({email:null, createdAt: null, updatedAt: null, _id: null }) //FIX 
  }

  render(){

    return (
      <div>
      
      <Switch>
        <Route exact path="/" render={(props) => <Landing {...props} />}></Route>

        <Route exact path="/home" render={(props) => <Home {...props} user={this.state} />}></Route>

        <Route exact path="/sign-up" render={(props) => <SignUp {...props} setUser={this.setUser}  />}></Route>

        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser} />}></Route>

        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state} />}></Route>
        
        {/* <Route exact path="/post" render={(props) => <PostTrade {...props}  />}></Route> */}

        <Route component={NotFound} />
      </Switch>
      
    </div>
  );
  }
}
export default App;
