import axios from 'axios';
import { reaction } from 'mobx';

export default class HttpService {

    constructor(rootStore, baseUrl) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;
        this.isRefreshingToken = false;
        axios.defaults.baseURL = baseUrl;

        reaction(() => this.authStore.authToken, value => {
            axios.defaults.headers['Authorization'] = value;
        });

        axios.interceptors.response.use(response => {
            console.log(response);
            return response;
        }, error => {
            const { config, response } = error;
            const originalRequest = config;
            if (response.status === 401) {
                if (this.authStore.refreshToken != null && !this.isRefreshingToken) {
                    this.isRefreshingToken = true;
                    return new Promise(resolve => {
                        this.refreshToken().then(token => {
                            originalRequest.headers.Authorization = token.token_type + ' ' + token.access_token;
                            resolve(axios(originalRequest));
                        }).finally(() => {
                            this.isRefreshingToken = false;
                        });
                    });
                } else {
                    alert('need to login');
                    this.rootStore.history.push('/login');
                }
            }
            return Promise.reject(error);
        });
    }

    indexItems() {
        return axios.get('/items/')
            .then((response) => {
                return response.data;
            });
    }

    getItem(itemId) {
        return axios.get('/items/' + itemId + '/')
            .then((response) => {
                return response.data;
            });
    }

    purchaseItem(itemId) {
        return axios.post('/items/' + itemId + '/purchase/').then((response) => {
            return response.data;
        });
    }

    purchaseItems(items) {
        return axios.post(
            '/items/purchase/',
            {
                items
            }
        ).then((response) => {
            return response.data;
        });
    }

    indexCategoryItems(categoryId) {
        return axios.get('/categories/' + categoryId + '/items/')
            .then((response) => {
                return response.data;
            });
    }

    indexCategories() {
        return axios.get('/categories/')
            .then((response) => {
                return response.data;
            });
    }

    getMe() {
        return axios.get('/me/').then((response) => {
            return response.data;
        });
    }

    indexMyItems() {
        return axios.get('/me/items/').then((response) => {
            return response.data;
        });
    }

    login(username, password) {
        return axios.post(
            '/o/token/',
            {
                grant_type: 'password',
                client_id: 'L5EJWpimAOYOidk29pdoJyu2pdNjPkrHdpjeT2Vq',
                username,
                password
            }
        ).then((response) => {
            return response.data;
        });
    }

    register(username, password) {
        return axios.post(
            '/users/',
            {
                username,
                password
            }
        ).then((response) => {
            return response.data;
        });
    }

    refreshToken() {
        return axios.post(
            '/o/token/',
            {
                grant_type: 'refresh_token',
                client_id: 'L5EJWpimAOYOidk29pdoJyu2pdNjPkrHdpjeT2Vq',
                refresh_token: this.authStore.refreshToken
            }
        ).then((response) => {
            this.authStore.setToken(response.data);
            return response.data;
        });
    }

}
