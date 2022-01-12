import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
    pickerContainer: {
        width: '100%'
    },
    picker: {
        width: '100% !important',
        margin: '1rem 0 1rem 0'
    },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '2rem'
    },
    colorNameInput: {
        width:'100%',
        height: '70px'
    }
};

class Colorpickerform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
            this.props.colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
        ));
        ValidatorForm.addValidationRule('isColorUnique', (value) => (
            this.props.colors.every(color => color.color !== this.state.currentColor)
        ));
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' });
    }
    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;

        return (
            <div className={classes.pickerContainer}>
                <ChromePicker
                    color={currentColor}
                    onChange={this.updateCurrentColor}
                    className={classes.picker}
                /* onChangeComplete={(newColor) => console.log(newColor)} */
                />
                <ValidatorForm
                    onSubmit={this.handleSubmit}
                >
                    <TextValidator
                        value={newColorName}
                        className={classes.colorNameInput}
                        name="newColorName"
                        variant="filled"
                        margin="normal"
                        placeholder='Color Name'
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['the field is required!', 'Color name must be unique!', 'Color already used']}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{ backgroundColor: paletteIsFull ? "grey" : currentColor }}
                    >
                        {
                            paletteIsFull ? "Palette Full" : "Add Color"
                        }
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(Colorpickerform);
