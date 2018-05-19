// @flow
import config from "../config";

const logger = tag => d => console.log(`api> ${tag}: `, d) || d;

export function uploadGame(token: string, data: any) {
  console.log("token=", token);
  const url = config.BASE_URL + "/users";
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({data}),
    headers: {
      token,
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(logger("uploadGame"))
    .catch(e => {
      console.log("failed to upload:", e);
    });
}
