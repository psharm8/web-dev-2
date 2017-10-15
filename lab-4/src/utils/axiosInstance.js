/**
 * Created by only2 on 14-10-2017.
 */
import axios from "axios";
const apiRoot = "https://pokeapi.co/api/v2/";

const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
    function(config) {
        config.url = `${apiRoot}${config.url}`;
        if(config.url.indexOf('?')<0){
            config.url = `${config.url}/`;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default instance;
