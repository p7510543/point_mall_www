import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('httpService', 'authStore', 'itemStore', 'history')
@observer
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            categories: []
        };
    }

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories() {
        this.props.httpService.indexCategories()
            .then(categories => {
                this.setState({
                    categories
                });
            });
    }

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'search') {
            this.setState({
                searchText: target.value
            });
        }
    }

    search = () => {
        this.props.history.push('/tags/' + this.state.searchText);
    }

    render() {
        const { authStore, itemStore } = this.props;
        const categories = this.state.categories.map((category) => {
            return (
                <Link key={category.id} to={'/categories/' + category.id}>{category.title}</Link>
            )
        });
        return (
            <header>
                <Link to="/">PointMall</Link>
                {categories}
                <div className="header-right">
                    <Link to="/cart/items">Cart {itemStore.cartItemsCount}</Link>
                    {
                        authStore.isLoggedIn &&
                        <Link to="/me/history">History</Link>
                    }
                    {
                        authStore.isLoggedIn ?
                            <Link to="/me/items">My Items</Link> :
                            <Link to="/register">Register</Link>
                    }
                    {
                        authStore.isLoggedIn ?
                            <button onClick={this.logout}>Logout</button> :
                            <Link to="/login">Login</Link>
                    }
                    <input
                        style={{marginLeft: '1em'}}
                        value={this.state.searchText}
                        onChange={this.onInputChanged}
                        type="text"
                        name="search"/>
                    <button onClick={this.search}>Search</button>
                </div>
            </header>
        );
    }
}


export default Header;
