import React from "react";
import {Provider} from "react-redux";
import App from "./Components/App";
import store from "./logic/store";

export default (Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
));
