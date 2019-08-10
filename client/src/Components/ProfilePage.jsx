import React from 'react';
import Button from '@material-ui/core/Button';

export default class ProfilePage extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            email: 'email',
            firstName: 'name1',
            lastName: 'name2',
            notifications: ['budget met', '% of limit reached']
        }
    }

    render () {
        return (
            <>
                <h1>Profile Page</h1>
                {/* {make the following clickable for editing} */}
                <p>
                    {this.state.firstName}
                    <Button>Edit</Button>
                </p>
                <p>
                    {this.state.lastName}
                    <Button>Edit</Button>
                </p>
                <p>
                    {this.state.email}
                    <Button>Edit</Button>
                </p>
            </>
        )
    }
}