import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render () {
    let orders = this.props.loading ?
      <Spinner /> :
      <>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />
        ))}
      </>;

    return orders;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));