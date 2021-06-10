import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';

import { InputText } from 'primereact/inputtext';
import { startPrudctLoading } from '../../actions/product.action';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadUsers, startLoadSearchUsers } from '../../actions/user.action';
import { Paginator } from 'primereact/components/paginator/Paginator';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { locale} from 'primereact/api';

export const DataTableCrudDemo = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product)
    const { users, totalUsers } = useSelector(state => state.user)
    // const [products, setProducts] = useState(null);

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona la tecla \'Enter\' para ir a esta pag.');
    const [customFirst1, setCustomFirst1] = useState(0);
    const [customRows1, setCustomRows1] = useState(5);
    const pageCount = Math.ceil(totalUsers / customRows1);
    const toast = useRef(null);
    const dt = useRef(null);
    locale('ES');

    useEffect(() => {
        dispatch(startPrudctLoading())
        if(!globalFilter){
            dispatch(startLoadUsers(customRows1, customFirst1))
        }
        if(globalFilter){
            dispatch(startLoadSearchUsers(globalFilter,customRows1, customFirst1))
        }
    }, [dispatch, customFirst1, customRows1,globalFilter]); // eslint-disable-line react-hooks/exhaustive-deps

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const rightToolbarTemplate = () => {
        return (
            <>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </>
        )
    }
    const statusBodyTemplate = (rowData) => {

        return (
            <span>{rowData ? 'Disponible' : 'Sin Stock'}</span>
        );
    }


    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const onCustomPageChange1 = (event) => {
        console.log(event);
        setCustomFirst1(event.first);
        setCustomRows1(event.rows);
        setCurrentPage(event.page + 1);
    }

    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Previous</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-p-3">Next</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 5, value: 5 },
                { label: 10, value: 10 },
                { label: 15, value: 15 },
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="p-mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText size="2" className="p-ml-1" value={currentPage} tooltip={pageInputTooltip}
                        // onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={handleChangePage} />
                         onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange} /> 
                </span>
            )
        }
    };
  
    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 0 || page > options.totalPages) {
                setPageInputTooltip(`El valor debe estar entre 1 y ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setCustomFirst1(first);
                setPageInputTooltip('Presiona la tecla \'Enter\' para ir a esta pag.');
            }
        }
    }

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" /* left={leftToolbarTemplate} */ right={rightToolbarTemplate}></Toolbar>
                {
                    products &&
                    <>
                        <DataTable ref={dt} value={users} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                            dataKey="name"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            totalPages={pageCount}
                            globalFilter={globalFilter}
                            header={header}>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="name" header="Name" sortable></Column>
                            {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
                            <Column field="role" header="Role" sortable></Column>
                            {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
                            <Column field="asd" header="Estado" body={statusBodyTemplate} sortable></Column>
                        </DataTable>
                        <Paginator template={template1} first={customFirst1} rows={customRows1} totalRecords={totalUsers} onPageChange={onCustomPageChange1}></Paginator>
                    </>
                }
            </div>


        </div>
    );
}