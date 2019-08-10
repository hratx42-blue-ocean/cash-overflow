import React from 'react';

export default class ProfilePage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            email: 'email',
            firstName: 'name1',
            lastName: 'name2',
            notifications: [],
        }
    }

    render () {
        return (
            <>
                <h1>Profile Page</h1>
                <p>{this.state.firstName}</p>
                <p>{this.state.lastName}</p>
                <p>{this.state.email}</p>
            </>
        )
    }
}