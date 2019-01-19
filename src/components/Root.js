import React from "react";
import { Provider } from "mobx-react";
import { moviesPageStore } from "../stores/moviesPageStore";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import MoviesScreen from "./screens/MoviesScreen/MoviesScreen";
import { Router, Stack, Scene } from "react-native-router-flux";

class Root extends React.Component {
  render() {
    return (
      <Provider moviesPageStore={moviesPageStore}>
        <Router>
          <Stack key="root">
            {/*
            <Scene key="login" component={LoginScreen} title="Login" />
            */}
            <Scene
              hideNavBar
              initial
              key="movies"
              component={MoviesScreen}
              title="Movies"
            />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

export default Root;
