import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog';
import useValidation from '../../hooks/useValidation';
import { productValidate } from '../../validation/formValidate';
import { Button } from 'primereact/button';
import AsyncSelect from 'react-select/async';
import { useDispatch, useSelector } from 'react-redux';
import { startPrudctUpdate } from '../../actions/product.action';

const initialForm = {
    name: '',
    category: '',
    available: '',
    price: 0,
    user: '',
}
export const ProductModalSave = ({ formValues, productDialog, setProductDialog, handleChange }) => {

    const dispatch = useDispatch()
    const { categoryOption } = useSelector(state => state.category)
    const [categorySelected, setcategorySelected] = useState({})
    const { handleSubmit } = useValidation(initialForm, productValidate, handleSubmitProduct)
    const { name, price, available, category } = formValues;

    function handleSubmitProduct(e) {
        e.preventDEfault()
        console.log(e);
    }
    const filterColors = (inputValue) => {
        return categoryOption.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    const promiseOptions = inputValue =>
        new Promise(resolve => {
            resolve(filterColors(inputValue));
        });

    const saveProduct = () => {
        if (!categorySelected.label && category._id) {
            formValues.category = category._id;
            dispatch(startPrudctUpdate(formValues?.pid, formValues))
            // setFormValues(initialForm);
            setProductDialog(false);
            return;
        } else if (formValues?.pid) {
            formValues.category = categorySelected._id;
            dispatch(startPrudctUpdate(formValues?.pid, formValues))
            // setFormValues(initialForm);
            setProductDialog(false);
            setcategorySelected({})
        }

    }
    const hideDialog = () => {
        //hacer el submit edit
        setProductDialog(false);
    }

    const handleChangeSelect = (data) => {
        setcategorySelected(data)

    }
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} onSubmit={handleSubmit} />
        </>
    );

    return (
        <div>
            <Dialog
                visible={productDialog}
                style={{ width: '450px' }}
                header="Product Details"
                modal
                className="p-fluid"
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                <form
                    className="form-group"
                >
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={handleChange}
                    />
                    <label htmlFor="category" >categoria</label>
                    <AsyncSelect
                        cacheOptions
                        defaultInputValue={category?.name}
                        defaultValue={{ label: category?.name, value: category?.name }}
                        defaultOptions={categoryOption}
                        loadOptions={promiseOptions}
                        onChange={handleChangeSelect}
                        className='select'
                    />
                    <label htmlFor="">Stock</label>
                    <input
                        type="text"
                        className="form-control"
                        name="available"
                        value={available}
                        onChange={handleChange}
                    />
                    <label htmlFor="">price</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={handleChange}
                    />
                </form>
            </Dialog>
        </div>
    )
}
