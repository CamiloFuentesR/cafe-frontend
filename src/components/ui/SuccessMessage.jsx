import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { endSuccessMessage } from '../../actions/ui.action';


export const SuccessMessage = () => {

    const dispatch = useDispatch();
    const { successMessage } = useSelector(state => state.ui)

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();

    const handleClose = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        dispatch(endSuccessMessage());
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={successMessage}
                autoHideDuration={2400}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success">
                    Role editado con éxito
          </Alert>
            </Snackbar>
        </div>
    )
}
