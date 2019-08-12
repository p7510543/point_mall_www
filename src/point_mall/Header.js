import React from 'react';
import { Link } from 'react-router-dom';
import DataHelper from '../DataHelper';
import { inject, observer } from 'mobx-react';

@inject('authStore', 'itemStore', 'httpService')
@observer
class Header extends React.Component {

    helper = new DataHelper();
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.indexCategories();
    }

    indexCategories() {
        const { httpService } = this.props;
        httpService.indexCategories()
            .then((categories) => {
                this.setState({
                    categories: categories
                });
            });
    }

    logout = () => {
        const { authStore } = this.props;
        authStore.deleteToken();
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
                        authStore.isLoggedIn ?
                            <Link to="/me/items">My Items</Link> :
                            <Link to="/register">Register</Link>
                    }
                    {
                        authStore.isLoggedIn ?
                            <button onClick={this.logout}>Logout</button> :
                            <Link to="/login">Login</Link>
                    }
                </div>
            </header>
        );
    }
}


export default Header;
