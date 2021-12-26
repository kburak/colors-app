import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slider from 'rc-slider';

import styles from './Styles/NavbarStyles';
import 'rc-slider/assets/index.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            format: "hex",
            open: true
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(e){
        this.setState({format: e.target.value, open: true}, 
            () => this.props.handleChange(this.state.format));
    }
    closeSnackbar(){
        this.setState({open: false});
    }
    render() {
        const {level, changeLevel, showingAllColors, classes} = this.props;
        const {format} = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.Logo}>
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {showingAllColors && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.Slider}>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900} 
                                onAfterChange={changeLevel}
                                step={100}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.SelectContainer}>
                    <Select value={format} onChange={this.handleFormatChange} variant="standard">
                        <MenuItem value="hex">HEX - #fffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} 
                            color="inherit" 
                            key="close" 
                            aria-label="close">
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);
