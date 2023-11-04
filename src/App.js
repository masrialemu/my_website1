import React from 'react';
import { Switch, Route, Redirect  } from 'react-router-dom';
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
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <LoginMain />
        </Route>
        <Route path="/post">
            {token ? <PostMainn /> : <Redirect to="/login" />}
        </Route>
        <Route path="/project/:postid">
          <DetailMain />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
