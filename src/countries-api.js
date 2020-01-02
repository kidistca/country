import axios from "axios";

// const ironBeerService = axios.create({
//   baseURL: "https://ih-beer-api.herokuapp.com/"
// });

export function list() {
  return new Promise((resolve, reject) => {
    // ironBeerService
    //   .get("/beers")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("response kidist", response.data);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const list = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("response kidist", response.data);
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
