/**
 * Created by only2 on 29-09-2017.
 */
import axios from "axios";

//const url=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=e090d166c16d747e4013ff258dff7aec`;
const apiRoot = "https://gateway.marvel.com:443/v1/public/";
const apiKey = "e090d166c16d747e4013ff258dff7aec";
//const url=`${apiRoot}characters?nameStartsWith=${searchQuery}&apikey=${apiKey}`;

const instance = axios.create();

instance.interceptors.request.use((config) => {
    config.url = `${apiRoot}${config.url}&apikey=${apiKey}`;

    return config;

}, error => {
    return Promise.reject(error);
});

export default instance;

