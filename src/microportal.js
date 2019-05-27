import 'zone.js';
import {start} from 'single-spa';
import {GlobalEventDistributor} from './globalEventDistributor'
import {loadApp, validateToken} from "./helper";
import axios from 'axios';

const init = async () => {
    const globalEventDistributor = new GlobalEventDistributor();
    const valid = await validateToken()

    if (valid) {
        const {data} = await axios.get('/core-service/applications');

        data.forEach(async (app) => {
            await loadApp(app.name, app.path, app.indexUrl, app.storeUrl, globalEventDistributor);
        });
    } else {
        await loadApp('login-ui', '', '/login-ui/index.js', '/login-ui/store.js', globalEventDistributor)
    }

    start();
}

init();
