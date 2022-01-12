import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import Colorpickerform from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Draggablecolorlist from './DraggableColorList';
import {arrayMoveImmutable} from 'array-move';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        display: 'flex',
        alignItems: 'center'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
    },
    buttons: {
        width: '100%'
    },
    button: {
        width: '50%'
    }
});

class Newpaletteform extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            colors: this.props.palettes[0].colors
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.handleColorSort = this.handleColorSort.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    handleDrawerOpen() {
        this.setState({ open: true });
    };
    handleDrawerClose() {
        this.setState({ open: false });
    };
    addNewColor(newColor) {
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" });
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    clearColors(){
        this.setState({colors: []});
    }
    addRandomColor(){
        //pick random color from existing palettes
        const allColors = this.props.palettes.map(p => p.colors).flat(); //.flat(); Alternative to reduce big O(N)
        const rand = () => Math.floor(Math.random() * allColors.length);
        let randomColor = allColors[rand()];
        let existingColorNames = this.state.colors.map(color => color.name);

        while(existingColorNames.indexOf(randomColor.name) >= 1){
            randomColor = allColors[rand()];
        }

        this.setState({colors: [...this.state.colors, randomColor]});

        //Reduce alternative
        /* const flattened = allColors.reduce((all, colorBlock) => {
            all.push(...colorBlock);
            return all;
        }, []); */
        //Multiple Pointer alternative big O(N)
        /* let i = 0,
            j = 0;
        let flat = [];
        while (i < allColors.length){
            if(j < allColors[i].length){
                flat.push(allColors[i][j]);
                j++;
            } else {
                i++;
                j = 0;
            }
        } */
    }
    handleSubmit(newPaletteName) {
        let newName = newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLocaleLowerCase().replace(/ /g, "-"),
            colors: this.state.colors
        };
        this.props.savePalette(newPalette);
        this.props.history.push("/");
    }
    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }
    onSortEnd({ oldIndex, newIndex }){
        this.setState(({ colors }) => ({
            colors: arrayMoveImmutable(colors, oldIndex, newIndex),
        }));
    };
    handleColorSort(sortedColors){
        this.setState({colors: sortedColors})
    }
    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, currentColor, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav 
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>
                            Design your palette
                        </Typography>
                        <div className={classes.buttons}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={this.clearColors}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.addRandomColor}
                                disabled={paletteIsFull}
                                className={classes.button}
                            >
                                Random Color
                            </Button>
                        </div>
                        <Colorpickerform 
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                            colors={colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Draggablecolorlist
                        colors={this.state.colors}
                        handleColorSort={this.handleColorSort}
                        removeColor={this.removeColor}
                    />
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Newpaletteform);
