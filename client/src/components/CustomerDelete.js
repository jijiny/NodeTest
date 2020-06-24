import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }

    deleteCustomerDB(id) {
        const url = '/api/customers/delete/' + id;
        fetch(url, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
            <button onClick={(e) => {this.deleteCustomerDB(this.props.id)}}>DB 삭제</button>
            </div>
        )
    }

}

export default CustomerDelete;