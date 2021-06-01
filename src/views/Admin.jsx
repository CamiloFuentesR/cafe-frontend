import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux';
import { startLoadUsers } from '../actions/user.action';
import nouser from '../styles/img/nouser.png'

export const Admin = () => {

    const dispatch = useDispatch();

    const { users, totalUsers } = useSelector(state => state.user)
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPages = 10;
    const pagesVisited = pageNumber * usersPerPages;

    useEffect(() => {
        // if (pagesVisited > 0) {
        dispatch(startLoadUsers(usersPerPages, pagesVisited))
        

    }, [dispatch, pagesVisited])


    const displayUsers = users
        // .slice(pagesVisited, pagesVisited + usersPerPages) //sin ssr
        .map(user => (

            <tbody key={user.name}>
                <tr>
                    <td>
                        <div className="__user_img">
                            <img src={user.img !== undefined ? user.img : nouser} alt="imagen perfil" className="img" />
                        </div>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.state ? 'activo' : 'inactivo'}</td>
                </tr>
            </tbody>
        ));

    const pageCount = Math.ceil(totalUsers / usersPerPages);

    function handleChangePage({ selected }) {
        setPageNumber(selected);
    }

    return (
        <div className="__user_screen_container">

            <div className="user_table_container">
                <div className="__user_container">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th className="__user_img">Foto</th>
                                <th className="__user_name">User</th>
                                <th className="__user_role">Rol</th>
                                <th className="__user_state">Estado</th>
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
