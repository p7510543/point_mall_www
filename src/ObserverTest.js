import React from 'react';
import Observable from './Observable';

export default class ObserverTest extends React.Component {

    constructor(props) {
        super(props);
        this.observable = new Observable();
        this.observable.addObserver(this);
    }

    click = () => {
        this.observable.a++;
    }

    render() {
        return (
            <div>
            {this.observable.a}
            <button onClick={this.click}>Test</button>
            </div>
        )
    }
}