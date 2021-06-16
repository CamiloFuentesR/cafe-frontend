import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';   

import React, { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

import { useSelector } from 'react-redux';
import { ProductTable } from '../components/products/ProductTable';
import { Locale } from '../components/ui/Locale';


export const Products = () => {

    const { products, totalProducts } = useSelector(state => state.product)
    const toast = useRef(null);
    const dt = useRef(null);

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
    return (
        <>
            <Locale />
            <div className="__products_screen">
                <>
                    <div className="datatable-crud-demo">
                        <Toast ref={toast} />
                        <div className="card">
                            <Toolbar className="p-mb-4" right={rightToolbarTemplate}></Toolbar>
                            {
                                products &&
                                <>
                                    <ProductTable
                                        totalProducts={totalProducts}
                                        products={products}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </>
            </div>
        </>
    );
}