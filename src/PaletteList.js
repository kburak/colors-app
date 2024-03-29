import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import styles from './Styles/PaletteListStyles';
import {Link} from 'react-router-dom';

class Palettelist extends Component {
    goToPalette(id){
        this.props.history.push("/palette/" + id);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {this.props.list.map(palette => (
                            <MiniPalette 
                                key={palette.paletteName} 
                                {...palette} 
                                handleClick={() => this.goToPalette(palette.id)}
                                handleDelete={this.props.deletePalette}
                                id={palette.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Palettelist);
