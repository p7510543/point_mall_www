export default class Observable {
    constructor() {
        this.observers = [];
        this._a = 0;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    set a(a) {
        this._a = a;
        for (let observer of this.observers) {
            observer.forceUpdate();
        }
    }

    get a() {
        return this._a;
    }
}
