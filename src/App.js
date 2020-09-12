import React from 'react';
import './App.css'
import {connect}from 'react-redux'
// 引入路由组件
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

// 引入路由页面
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'


class App extends React.Component{
    render() {
      return (
          <Router>
              <Switch>
                  <Route path={"/login"} component={Login}/>
                  <Route path={"/"} component={Admin}/>
              </Switch>
          </Router>
      );
    }
}

const mapStateToProps = (state)=>{
    return {
        
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);