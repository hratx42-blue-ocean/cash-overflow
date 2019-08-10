import React from 'react';

export default class ProfilePage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            email: '',
            firstName: '',
            lastName: '',

        }
    }

    render () {
        return (
            <h1>Profile Page</h1>
        )
    }
}