import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux';
import { startLoadUsers } from '../../actions/user.action';
import { UserComponent } from '../../components/users/UserComponent';
import nouser from '../../styles/img/nouser.png'
import { startLoadingRoles } from '../../actions/role.action';
import { SuccessMessage } from '../../components/ui/SuccessMessage';

export const AdminUsers = () => {

    const dispatch = useDispatch();
    const { users, totalUsers } = useSelector(state => state.user)

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPages = 10;
    const pagesVisited = pageNumber * usersPerPages;
    const pageCount = Math.ceil(totalUsers / usersPerPages);

    useEffect(() => {
        dispatch(startLoadingRoles())
        dispatch(startLoadUsers(usersPerPages, pagesVisited))
    }, [dispatch, pagesVisited])

    const displayUsers = users
        // .slice(pagesVisited, pagesVisited + usersPerPages) //sin ssr
        .map(user => (
            <UserComponent
                user={user}
                nouser={nouser}
                key={user.uid}
                usersPerPages={usersPerPages}
                pagesVisited={pagesVisited}
            />
        ));
    function handleChangePage({ selected }) {
        setPageNumber(selected);
    }
    return (
        <div className="__user_screen_container">
            <>
                <div className="user_table_container">
                    <div className="__user_container">
                        <table className="table table-hover">
                            <thead className="text-center">
                                <tr >
                                    <th className="">Foto</th>
                                    <th className="">User</th>
                                    <th className="">Rol</th>
                                    <th className="">Inactivo/Activo</th>
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
            </>
            <SuccessMessage/>
        </div>
    )
}
