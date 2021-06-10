import { useDispatch, useSelector } from 'react-redux'
import { startDeleteUser, StartUpdateUser } from '../../actions/user.action'
import AsyncSelect from 'react-select/async';
import Swal from 'sweetalert2';
import { startSuccessMessage } from '../../actions/ui.action';
import { Avatar, makeStyles } from '@material-ui/core';

export const UserComponent = ({ user, nouser }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }));
    const classes = useStyles();
    <div className={classes.root}>
    </div>


    const { roleOption } = useSelector(state => state.role);
    const dispatch = useDispatch()
    const filterColors = (inputValue) => {
        return roleOption.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            resolve(filterColors(inputValue));
        });
    const handleDelete = ({ target }) => {
        if ((target.type === 'checkbox' && user.state === true)) {
            console.log(user.state);
            Swal.fire({
                title: '¿Estas seguro que deseas eliminar este usuario?',
                text: "¡Este usuario no  tendrá acceso al sistema!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, eliminar este usuario!'
            }).then((result) => {
                if (result.isConfirmed) {
                    user.state = false
                    dispatch(startDeleteUser(user))
                    Swal.fire(
                        'Usuario Eliminado!',
                        'Este usuario no tendrá acceso al sistema',
                        'success'
                    )
                }
            })
        }
        else if ((target.type === 'checkbox' && user.state === false)) {
            Swal.fire({
                title: '¿Desea activar este usuario?',
                text: "¡Este usuario tendrá acceso al sistema!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Si, activar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    user.state = true
                    dispatch(StartUpdateUser(user.uid, user))
                    Swal.fire(
                        'Usuario Activado!',
                        'Este usuario ha sido activado  ',
                        'success'
                    )
                }
            })
        }
    }
    const handleRoleChange = (inputValue) => {
        dispatch(startSuccessMessage())
        user.role = inputValue.value;
        dispatch(StartUpdateUser(user.uid, user))
    }
    const handleChecked = () => {
    }
    return (
        <tbody>
            <tr
                className="text-center align-middle"
                onClick={handleDelete}
            >
                <td className="col-1">
                    {/* <div className="__user_img">
                        <img src={user.img !== undefined ? user.img : nouser} alt="imagen perfil" className="img" />
                    </div> */}
                    <Avatar alt="Remy Sharp" src={user.img !== undefined ? user.img : nouser} />
                </td>
                <td className="col-6" >
                    {user.name}
                </td>
                <td className="col-3" id="role" >
                    {/* {user.role} */}
                    <AsyncSelect
                        cacheOptions
                        defaultInputValue={user.role}
                        defaultValue={{ label: user.role, value: user.role }}
                        defaultOptions={roleOption}
                        loadOptions={promiseOptions}
                        // getOptionLabel={({ role }) => role}
                        className='select'
                        onChange={handleRoleChange}
                    />
                </td>
                <td className="col-5 h-100">{/* {user.state ? 'activo' : 'inactivo'} */}
                    <div className="form-switch  d-flex-column   flex-wrap justify-content-center">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={user.state} onChange={handleChecked} />
                        {/* <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{ user.state? 'activo' : 'inactivo'}</label> */}
                    </div>
                </td>
            </tr>
        </tbody>
    )
}
