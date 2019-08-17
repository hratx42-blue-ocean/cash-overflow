import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const ProfileRPSuccess = props => {
    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Typography>Your monthly reminder is set!</Typography>
            <Button onClick={props.toggleSuccessMessage}>OK</Button>
        </Grid>
    )
}

export default ProfileRPSuccess;
