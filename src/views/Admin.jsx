import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux';
import { startLoadUsers } from '../actions/user.action';
import { UserComponent } from '../components/users/UserComponent';
import nouser from '../styles/img/nouser.png'

export const Admin = () => {

    const dispatch = useDispatch();
    const { users, totalUsers } = useSelector(state => state.user)
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPages = 10;
    const pagesVisited = pageNumber * usersPerPages;
    const pageCount = Math.ceil(totalUsers / usersPerPages);

    useEffect(() => {
        dispatch(startLoadUsers(usersPerPages, pagesVisited))
    }, [dispatch, pagesVisited])
   
    const displayUsers = users
        // .slice(pagesVisited, pagesVisited + usersPerPages) //sin ssr
        .map(user => (



            <UserComponent
                user={user}
                nouser={nouser}
                key={user.uid}
            />

            // <tbody key={user.name}>
            //     <tr 
            //         className="text-center align-middle"
            //         onClick={handleDelete}
            //     >
            //         <td className="col-1">
            //             <div className="__user_img">
            //                 <img src={user.img !== undefined ? user.img : nouser} alt="imagen perfil" className="img" />
            //             </div>
            //         </td>
            //         <td className="col-6" >
            //             <div className="">
            //                 {user.name}
            //             </div>
            //         </td>
            //         <td className="col-4">{user.role}</td>
            //         <td className="col-2">{user.state ? 'activo' : 'inactivo'}</td>
            //     </tr>
            // </tbody>
        ));
    function handleChangePage({ selected }) {
        setPageNumber(selected);
    }

   



    return (
        <div className="__user_screen_container">
            <div className="user_table_container">
                <div className="__user_container">
                    <table className="table table-hover">
                        <thead className="text-center">
                            <tr >
                                <th className="">Foto</th>
                                <th className="">User</th>
                                <th className="">Rol</th>
                                <th className="">Estado</th>
                            </tr>
                        </thead>
                        {displayUsers}
                    </table>
                </div>

            </div>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={handleChangePage}
                containerClassName={"paginationBtns"}
                previousLinkClassName={"previusBtn"}
                nextLinkClassName={"nextBtn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
            />
        </div>
    )
}
