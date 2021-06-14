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
import { startPrudctLoading, startSearchPrudctLoading } from '../actions/product.action';
import { useDispatch, useSelector } from 'react-redux';
import { Paginator } from 'primereact/components/paginator/Paginator';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { Dialog } from 'primereact/dialog';
import { locale } from 'primereact/api';
locale('ES');


export const Products = () => {
    const dispatch = useDispatch();
    const { products, totalProducts } = useSelector(state => state.product)
    //muestra los proructos como array de objetos
    const [selectedProducts, setSelectedProducts] = useState(null);
    // const [product, setProduct] = useState('');
    const [productDialog, setProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona la tecla \'Enter\' para ir a esta pag.');
    const [customFirst1, setCustomFirst1] = useState(0);
    const [customRows1, setCustomRows1] = useState(5);
    const toast = useRef(null);
    const dt = useRef(null);
    useEffect(() => {
        if (!globalFilter) {
            dispatch(startPrudctLoading(customRows1, customFirst1))
        }
        if (globalFilter) {
            dispatch(startSearchPrudctLoading(globalFilter, customRows1, customFirst1))
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
            <span>{rowData.available ? 'Disponible' : 'Sin Stock'}</span>
        );
    }
    const categoryBodyTemplate = (rowData) => {
        return (
            <span className="span">{rowData.category.name}</span>
        );
    }
    const header = (
        <div className="table-header justify-content-end m-0">
            {/* <h5 className="p-m-0">Manage Products</h5> */}
            <div className="d-flex flex-direction-row align-items-center">
                <h5>producto</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Buscar..." />
                </span>
            </div>
            <div className="d-flex flex-direction-row align-items-center">
                <h5>categoria</h5>

                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText /* value={} */ /* onChange={(e) => setValue3(e.target.value)} */ placeholder="Search" />
                </span>

            </div>
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
    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mx-2" />
            </>
        );
    }
    const editProduct = (product) => {
        // setProduct({ ...product });
        setProductDialog(true);
    }
    const hideDialog = () => {
        //hacer el submit edit

        setProductDialog(false);
    }
    const saveProduct = () => {
        //save product dialog submit
        setProductDialog(false);
    }
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    return (
        <div className="__products_screen">

            <>
                <div className="datatable-crud-demo">
                    <Toast ref={toast} />
                    <div className="card">
                        <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
                        {
                            products &&
                            <>
                                <DataTable
                                    ref={dt}
                                    value={products}
                                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                                    selection={selectedProducts}
                                    dataKey="name"
                                    globalFilter={globalFilter}
                                    header={header}
                                    className="table"
                                >

                                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                                    <Column field="name" header="Name" sortable style={{ width: '150px' }} />
                                    <Column field="category.name" header="Categoria" body={categoryBodyTemplate} style={{ width: '150px' }} sortable />
                                    <Column field="available" header="Estado" body={statusBodyTemplate} style={{ width: '150px' }} sortable />
                                    <Column body={actionBodyTemplate} style={{ width: '150px' }} ></Column>
                                </DataTable>
                                <Paginator template={template1} first={customFirst1} rows={customRows1} totalRecords={totalProducts} onPageChange={onCustomPageChange1} />
                            </>
                        }
                    </div>
                </div>
                <Dialog
                    visible={productDialog}
                    style={{ width: '450px' }}
                    header="Product Details"
                    modal
                    className="p-fluid"
                    footer={productDialogFooter}
                    onHide={hideDialog}
                >
                    <form className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control" />
                        <label htmlFor="category" >categoria</label>
                        <input
                            type="text"
                            name="category"
                            className="form-control" />
                        <label htmlFor="">Stock</label>
                        <input
                            type="text"
                            className="form-control" />
                    </form>
                </Dialog>
            </>
        </div>
    );
}