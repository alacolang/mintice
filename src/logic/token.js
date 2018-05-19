// @flow
import {AsyncStorage} from "react-native";

function guid(): string {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
const genToken = () => "gonogo-" + guid();

export default function getToken() {
  return AsyncStorage.getItem("token").then(token => {
    if (!token) {
      token = genToken();
      AsyncStorage.setItem("token", token);
    }
    return token;
  });
}
