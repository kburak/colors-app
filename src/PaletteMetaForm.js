import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { DialogContentText } from '@mui/material';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
    handleClickOpen() {
        this.setState({ open: true });
    }
    handleClose() {
        this.setState({ open: false })
    }
    render() {
        const { newPaletteName } = this.state;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
                <ValidatorForm onSubmit={() => this.props.handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your palette. Make sure it's unique.
                        </DialogContentText>
                        <TextValidator
                            label="Palette Name"
                            onChange={this.handleChange}
                            name="newPaletteName"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            value={newPaletteName}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter palette name", "Name already used"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default PaletteMetaForm;
