import React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
    main: {
        backgroundColor: 'purple',
        border: '3px solid teal'
    },
    secondary: {
        backgroundColor: 'pink',
        '& h1': {
            color: 'white',
            '& span': {
                backgroundColor: 'yellow'
            }
        }
    }
};

function MiniPalette(props) {
    const { classes } = props;
    console.log(classes);
    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <section className={classes.secondary}>
                <h1>
                    Mini Palette <span>testing</span>
                </h1>
            </section>
            <span>testing 2</span>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);