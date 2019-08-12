import React from 'react';
import { inject } from 'mobx-react';

@inject('itemStore', 'httpService', 'history')
class ItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
    }

    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        const itemId = this.props.match.params.itemId;
        const { httpService } = this.props;
        httpService.getItem(itemId)
            .then((item) => {
                this.setState({
                    item: item
                });
            });
    }

    purchase = () => {
        const itemId = this.state.item.id;
        const { httpService } = this.props;
        httpService.purchaseItem(itemId)
            .then((response) => {
                console.log(response);
                this.props.history.push('/me/items');
            }).catch(error => {
                console.log(error.config);
            });
    }

    addToCart = () => {
        const { itemStore } = this.props;
        const item = this.state.item;
        itemStore.addItemToCart(item);
    }

    render() {
        const item = this.state.item;
        const title = item ? item.title : '';
        const desc = item ? item.description : '';
        const image = item ? item.image : null;
        return (
            <div id="container">
                <div className="item-image-container">
                    <img src={image} alt="" />
                </div>
                <div className="item-detail-container">
                    <p>
                        <b>{title}</b>
                    </p>
                    <p>{desc}</p>
                    <button onClick={this.purchase}>구입</button>
                    <button onClick={this.addToCart}>장바구니에 담기</button>
                </div>
            </div>  
        );
    }
}

export default ItemDetail;
