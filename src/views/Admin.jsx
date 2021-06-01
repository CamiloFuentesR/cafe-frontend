import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux';
import { startLoadUsers } from '../actions/user.action';

export const Admin = () => {

    const dispatch = useDispatch();

    const { users, totalUsers } = useSelector(state => state.user)
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPages = 10;
    const pagesVisited = pageNumber * usersPerPages;

    useEffect(() => {
        // if (pagesVisited > 0) {
            dispatch(startLoadUsers(usersPerPages, pagesVisited))
        // } else {
        //     return dispatch(startLoadUsers(usersPerPages, pagesVisited))
        // }
        
    }, [dispatch, pagesVisited])


    const displayUsers = users
        // .slice(pagesVisited, pagesVisited + usersPerPages) //sin ssr
        .map(user => (
            <div key={user.name} className="__user_container">
                <h4 className="__user_name">{user.name}</h4>
                <h4 className="__user_role">{user.role}</h4>
                <h4 className="__user_state">{user.state ? 'activo' : 'inactivo'}</h4>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id={user.name} defaultChecked  />
                    <label className="form-check-label" htmlFor={user.name}>Checked</label>
                </div>
            </div>
        ));

    const pageCount = Math.ceil(totalUsers / usersPerPages);

    function handleChangePage({ selected }) {
        setPageNumber(selected);
    }

    return (
        <div className="__user_screen_container">
            
            <div className="user_table_container">
            {displayUsers}
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
