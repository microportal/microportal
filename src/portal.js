import 'zone.js';
import {start, registerApplication} from 'single-spa';
import {GlobalEventDistributor} from './globalEventDistributor'
import {loadApp} from "./helper";
import axios from 'axios';

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();

    const {data} = await axios.get('/portal-service/applications');

    data.forEach(async (app) => {
        await loadApp(app.name, app.path, app.indexUrl, app.storeUrl, globalEventDistributor);
    });

    start();
}

init();
