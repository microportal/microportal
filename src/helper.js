import * as singleSpa from 'single-spa';
import axios from 'axios';

const config = {
    url: 'http://localhost/auth/realms',
    realm: 'MicroportalRealm',
    clientId: 'microportal-login',
    grant_type: 'password',
};


export const hashPrefix = prefix => {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}

export const loadApp = async (name, hash, appURL, storeURL, globalEventDistributor) => {
    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

    // try to import the store module
    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;

        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    // register the main with singleSPA and pass a reference to the store of the main as well as a reference to the globalEventDistributor
    singleSpa.registerApplication(name, () => SystemJS.import(appURL), hashPrefix(hash), customProps);
}

export const validateToken = async () => {
    const access_token = localStorage.getItem('microportal.access_token')

    if (access_token) {
        try {
            const url ='/login-service/token'
            const response = await axios.post(url, null, {headers: {'Authorization': `Bearer ${access_token}`}})
            return response.status === 200
        } catch (e) {
            return false
        }
    }
    return false
}
