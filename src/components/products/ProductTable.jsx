import React, { useEffect, useRef, useState } from 'react'

import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useDispatch } from 'react-redux';
import { Paginator } from 'primereact/components/paginator/Paginator';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';

import { productValidate } from '../../validation/formValidate';
import useValidation from '../../hooks/useValidation';
import { startPrudctLoading, startSearchProductByCategoryLoading, startSearchPrudctLoading } from '../../actions/product.action';
import { ProductModalSave } from './ProductModalSave';
import { startCategoryLoad } from '../../actions/category.action';

const initialForm = {
    name: '',
    category: { name: '' },
    available: '',
    price: 0,
    user: {},
}

export const ProductTable = ({ totalProducts, products }) => {

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [categoryValue, setcategoryaValue] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Presiona la tecla \'Enter\' para ir a esta pag.');
    const [customFirst1, setCustomFirst1] = useState(0);
    const [customRows1, setCustomRows1] = useState(5);
    const dt = useRef(null);
    const dispatch = useDispatch()

    const { formValues, /* errores, handleSubmit, */ handleChange, setFormValues } = useValidation(initialForm, productValidate, handleSubmitProduct)
    function handleSubmitProduct(e) {
        e.preventDEfault()
        console.log(e);
    }
    useEffect(() => {
        if (!globalFilter) {
            dispatch(startPrudctLoading(customRows1, customFirst1))
        }
        if (globalFilter) {
            dispatch(startSearchPrudctLoading(globalFilter, customRows1, customFirst1))
        }
        if(categoryValue) {
            dispatch(startSearchProductByCategoryLoading(categoryValue, customRows1, customFirst1))
        }
    }, [dispatch, customFirst1, customRows1, globalFilter, categoryValue]);


    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
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
                    <InputText /* value={} */
                        type="search"
                        onChange={(e) => setcategoryaValue(e.target.value)} 
                        placeholder="Buscar..." />
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
        dispatch(startCategoryLoad())
        setFormValues({ ...product })
        setProductDialog(true);
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    }
    return (
        <>
            <DataTable
                ref={dt}
                value={products}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                selection={selectedProducts}
                dataKey="name"
                globalFilter={globalFilter}
                header={header}
                className="table">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                <Column field="name" header="Name" sortable style={{ width: '150px' }} />
                <Column field="category.name" header="Categoria" body={categoryBodyTemplate} style={{ width: '150px' }} sortable />
                <Column field="available" header="Estado" body={statusBodyTemplate} style={{ width: '150px' }} sortable />
                <Column field="price" header="Price" body={priceBodyTemplate} style={{ width: '75px' }} sortable />
                <Column header="Acciones" body={actionBodyTemplate} style={{ width: '120px' }} />
            </DataTable>
            <Paginator
                template={template1}
                first={customFirst1}
                rows={customRows1}
                totalRecords={totalProducts}
                onPageChange={onCustomPageChange1}
            />

            <ProductModalSave
                formValues={formValues}
                productDialog={productDialog}
                setProductDialog={setProductDialog}
                handleChange={handleChange}
            />
        </>
    )
}
