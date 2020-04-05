const axios = require("axios");
const config = require("../config/config");

const makeCall = ({ url = '', method = 'get', data = {}, urlType = null, headers = null, message = 'Api Called' }) => {
                
    /**
     * Type 1 -> Yocket Main API
     * Type 2 -> Yocket Manager API
     */
    //  Handles invalid url to save network calls
    if(!url) {
        console.log("Invalid Url");
        throw 'Axios Error - Invalid URL!'
    }

    console.log(`${getBaseURL(urlType)}${url}`);

    return axios({
        method: method,
        url: `${getBaseURL(urlType)}${url}`,
        data: data,
        headers: headers
        });
};

const getBaseURL = (urlType) => {
    if (!urlType) {
        return '';
    }

    return urlType == 1 ? process.env.YOCKET_URL : process.env.YOCKET_URL_MANAGER;
};

module.exports = {
    makeCall
};