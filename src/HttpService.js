import axios from 'axios';

export default class HttpService {

    constructor(rootStore, baseUrl) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;
        axios.defaults.baseURL = baseUrl;
        axios.interceptors.response.use(response => {
            console.log(response);
            return response;
        }, error => {
            console.log(error);
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
        return axios.post(
            '/items/' + itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': this.authStore.authToken
                }
            }
        ).then((response) => {
            return response.data;
        });
    }

    purchaseItems(items) {
        return axios.post(
            '/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': this.authStore.authToken
                }
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
        return axios.get(
            '/me/',
            {
                headers: {
                    'Authorization': this.authStore.authToken
                }
            }
        ).then((response) => {
            return response.data;
        });
    }

    indexMyItems() {
        return axios.get(
            '/me/items/',
            {
                headers: {
                    'Authorization': this.authStore.authToken
                }
            }
        ).then((response) => {
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

}
