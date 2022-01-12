import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = theme => ({
    root: {
      display: 'flex'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px'
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    navBtns: {

    }
})

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
            this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase())
        ));
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    render() {
        const { classes, open } = this.props;
        const { newPaletteName } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create a palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                            <TextValidator
                                label="Palette Name"
                                onChange={this.handleChange}
                                name="newPaletteName"
                                value={this.state.newPaletteName}
                                validators={["required", "isPaletteNameUnique"]}
                                errorMessages={["Enter palette name", "Name already used"]}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save Palette
                            </Button>
                        </ValidatorForm>
                        <Link to='/'>
                                <Button variant='contained' color='secondary'>GO BACK</Button>
                        </Link>
                    </div>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);
