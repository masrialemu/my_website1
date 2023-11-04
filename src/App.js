import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Main/Home';
import NotFound from './Main/NotFound';
import LoginMain from './Component/Login/LoginMain';
import PostMainn from './Component/Login/PostMainn';
import DetailMain from './Component/Body/DetailMain';

function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData ? userData.token : null;

  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginMain} />
        <Route
          path="/post"
          render={() => (token ? <PostMainn /> : <Redirect to="/login" />)}
        />
        <Route path="/project/:postid" component={DetailMain} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
