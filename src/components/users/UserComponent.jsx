import React from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteUser, StartUpdateUser } from '../../actions/user.action'

export const UserComponent = ({ user, nouser }) => {

    const dispatch = useDispatch()
    

    const handleDelete = (e) => {
        // console.log(id);
        // console.log(e.target.type);
        if ((e.target.type === 'checkbox' && user.state)) {
            user.state=false
            return dispatch(startDeleteUser(user))
        }
        else{
            user.state =true;
            dispatch(StartUpdateUser(user.uid,user))
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
                <td className="col-3">{user.role}</td>
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
