import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import Draggablecolorlist from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
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
});

class Newpaletteform extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentColor: "#800080",
            newColorName: "",
            colors: this.props.palettes[0].colors
        }
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.handleColorSort = this.handleColorSort.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
            this.state.colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
        ));
        ValidatorForm.addValidationRule('isColorUnique', (value) => (
            this.state.colors.every(color => color.color !== this.state.currentColor)
        ));
    }
    handleDrawerOpen() {
        this.setState({ open: true });
    };
    handleDrawerClose() {
        this.setState({ open: false });
    };
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }
    addNewColor() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
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
                    classes={classes}
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
                    <Typography variant="h4">
                        Design your palette
                    </Typography>
                    <div>
                        <Button variant="contained" color="secondary" onClick={this.clearColors}>
                            Clear Palette
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={this.addRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker
                        color={currentColor}
                        onChange={this.updateCurrentColor}
                    /* onChangeComplete={(newColor) => console.log(newColor)} */
                    />
                    <ValidatorForm
                        onSubmit={this.addNewColor}
                    >
                        <TextValidator
                            value={this.state.newColorName}
                            name="newColorName"
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['the field is required!', 'Color name must be unique!', 'Color already used']}
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={paletteIsFull}
                            style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                        >
                            {
                                paletteIsFull ? "Palette Full" : "Add Color"
                            }
                        </Button>
                    </ValidatorForm>

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
