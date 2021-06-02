import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteUser } from '../../actions/user.action'

export const UserComponent = ({ user, nouser }) => {


    const dispatch = useDispatch()
    const [check, setcheck] = useState(user.state || false)


    const handleDelete = (e) => {
        // console.log(id);
        // console.log(e.target.type);
        if ((e.target.type === 'checkbox' && check)) {
            return dispatch(startDeleteUser(user.uid))
        }
    //     else{
    //         user.state =true;
    //         dispatch(StartUpdateUser(user.uid,user))
    //     }
    }

    const handleChecked = () => {
        // console.log('algo');
        setcheck(!user.state)
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
                    <div className="">
                        {user.name}
                    </div>
                </td>
                <td className="col-4">{user.role}</td>
                <td className="col-2">{/* {user.state ? 'activo' : 'inactivo'} */}

                    <div className="form-switch">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={check} onChange={handleChecked} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{ check? '- activo' : '-inactivo'}</label>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}
