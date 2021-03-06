import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import TranslateButton from "./TranslationHelpers/Button";
import ReactJsonWrapper from "./ReactJsonWrapper";
import { anonymizeObject } from "../Functions/Utils";

const Transition = props => <Slide direction="right" {...props} />;

const styles = {
    textField: {
        width: 480
    }
};

export default class ExportDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            anonymize: false,

            original: {},
            modified: {}
        };
    }

    onAnonymizeChange = e => {
        this.setState({
            anonymize: !this.state.anonymize
        });
    };

    render() {
        const { open, closeModal, title, object } = this.props;
        const { anonymize } = this.state;

        let anonymizedObject = object;
        if (anonymize) {
            try {
                // anonymize object while ignoring references
                anonymizedObject = anonymizeObject(object);
            } catch (ex) {
                // fallback to original object
                anonymizedObject = object;
            }
        }

        const jsonPretty = JSON.stringify(anonymizedObject, null, "\t");

        return (
            <Dialog TransitionComponent={Transition} keepMounted open={open} onClose={closeModal}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {anonymizedObject ? (
                        <ReactJsonWrapper style={styles.textField} data={anonymizedObject} name="Export Data" />
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <TranslateButton variant="outlined" onClick={this.onAnonymizeChange}>
                        {anonymize ? "Original" : "Anonymize"}
                    </TranslateButton>

                    <CopyToClipboard text={jsonPretty}>
                        <TranslateButton variant="outlined" onClick={closeModal}>
                            Copy
                        </TranslateButton>
                    </CopyToClipboard>

                    <TranslateButton variant="contained" onClick={closeModal} color="primary">
                        Ok
                    </TranslateButton>
                </DialogActions>
            </Dialog>
        );
    }
}
