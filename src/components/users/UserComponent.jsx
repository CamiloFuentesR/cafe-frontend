import { useDispatch, useSelector } from 'react-redux'
import { startDeleteUser, StartUpdateUser } from '../../actions/user.action'
import AsyncSelect from 'react-select/async';

export const UserComponent = ({ user, nouser }) => {

    const dispatch = useDispatch()

    const { roles } = useSelector(state => state.role);

    const roleLabel = roles.map(r => ({
        label: r.role,
        value: r.role
    }))

    console.log(roleLabel);

    const filterColors = (inputValue) => {
        return roleLabel.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            resolve(filterColors(inputValue));
        });
    const handleDelete = ({ target }) => {
        if ((target.type === 'checkbox' && user.state)) {
            user.state = false
            return dispatch(startDeleteUser(user))
        }
        if (target.id === 'role') {
            console.log('role');
        }
        else {
            user.state = true;
            dispatch(StartUpdateUser(user.uid, user))
        }
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
                    <div className="__user_img">
                        <img src={user.img !== undefined ? user.img : nouser} alt="imagen perfil" className="img" />
                    </div>
                </td>
                <td className="col-6" >
                    {user.name}
                </td>
                <td className="col-3" id="role" role="button">
                    {/* {user.role} */}
                    <AsyncSelect
                        cacheOptions
                        defaultInputValue={user.role}
                        defaultValue={{ label: user.role }}
                        defaultOptions={true}
                        loadOptions={promiseOptions}
                        // getOptionLabel={({ role }) => role}
                        className='select'
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
