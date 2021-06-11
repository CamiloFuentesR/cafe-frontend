import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';   

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { InputText } from 'primereact/inputtext';
// import { startPrudctLoading } from '../../actions/product.action';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadUsers, startLoadSearchUsers } from '../../actions/user.action';
import { Paginator } from 'primereact/components/paginator/Paginator';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import PrimeReact, { locale } from 'primereact/api';
locale('ES');
export const DataTableCrudDemo = () => {
    PrimeReact.ripple = true;
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product)
    const { users, totalUsers } = useSelector(state => state.user)
    console.log(users);

    //muestra los proructos como array de objetos
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona la tecla \'Enter\' para ir a esta pag.');
    const [customFirst1, setCustomFirst1] = useState(0);
    const [customRows1, setCustomRows1] = useState(5);
    const toast = useRef(null);
    const dt = useRef(null);
    // console.log(`Desde ${customFirst1} hasta ${customFirst1+customRows1} de ${totalUsers} usuarios`);
    useEffect(() => {
        // dispatch(startPrudctLoading())
        if (!globalFilter) {
            dispatch(startLoadUsers(customRows1, customFirst1))
        }
        if (globalFilter) {
            dispatch(startLoadSearchUsers(globalFilter, customRows1, customFirst1))
        }
    }, [dispatch, customFirst1, customRows1, globalFilter]);

    //lobtengo el el numero de la pag en la que estoy
    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }
    const exportCSV = () => {
        dt.current.exportCSV();
    }
    const rightToolbarTemplate = () => {
        return (
            <>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </>
        )
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <span>{rowData.state ? 'Disponible' : 'Sin Stock'}</span>
        );
    }
    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Buscar..." />
            </span>
        </div>
    );

    const onCustomPageChange1 = (event) => {
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

            return <Dropdown
                value={options.value}
                options={dropdownOptions}
                onChange={options.onChange}
                appendTo={document.body} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span
                    className="p-mx-3"
                    style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Ir a
                    <InputText
                        size="2"
                        className="p-ml-1"
                        value={currentPage}
                        tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)}
                        onChange={onPageInputChange} />
                </span>
            )
        }
    };
    //busqueda con input
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
                <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
                {
                    products &&
                    <>
                        <DataTable
                            ref={dt}
                            value={users}
                            onSelectionChange={(e) => setSelectedProducts(e.value)}
                            selection={selectedProducts}
                            dataKey="name"
                            globalFilter={globalFilter}
                            header={header}>
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                            <Column field="name" header="Name" sortable />
                            {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
                            <Column field="role" header="Role" sortable />
                            <Column field="email" header="Email" sortable />
                            {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
                            <Column field="estado" header="Estado" body={statusBodyTemplate} sortable />
                        </DataTable>
                        <Paginator template={template1} first={customFirst1} rows={customRows1} totalRecords={totalUsers} onPageChange={onCustomPageChange1} />
                    </>
                }
            </div>


        </div>
    );
}