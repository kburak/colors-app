import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { DialogContentText } from '@mui/material';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: "form",
            newPaletteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
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
    showEmojiPicker() {
        this.setState({ stage: "emoji" });
    }
    savePalette(newEmoji){
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: newEmoji.native
        }
        this.props.handleSubmit(newPalette);
    }
    render() {
        const { newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog
                    open={this.state.stage === "emoji"}
                    onClose={this.props.hideForm}
                >
                    <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
                    <Picker
                        onSelect={this.savePalette}
                    />
                </Dialog>
                <Dialog
                    open={this.state.stage === "form"}
                    aria-labelledby="form-dialog-title"
                    onClose={this.props.hideForm}
                >
                    <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
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
                            <Button onClick={hideForm} color="primary">
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
            </div>
        );
    }
}

export default PaletteMetaForm;
