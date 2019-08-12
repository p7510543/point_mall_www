import ItemStore from "./ItemStore";
import AuthStore from "./AuthStore";
import HttpService from './HttpService';
import { createBrowserHistory } from 'history';

export default class RootStore {

    constructor() {
        this.authStore = new AuthStore(this);
        this.itemStore = new ItemStore(this);
        this.httpService = new HttpService(this, 'http://localhost:8003');

        this.history = createBrowserHistory();
    }
}