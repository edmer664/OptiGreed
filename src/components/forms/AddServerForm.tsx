import React, { useContext, useEffect, useState } from 'react'
import FormItem from './FormItem';
import { Server } from '../../types/Types';
import { GlobalContext } from '../../context/GlobalContext';


interface IServerFormData {
    name: string, capacity: number
}
export default function AddServerForm() {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error('ThemeSwitcher must be used within a Provider');
      }

    const { setServers } = globalContext;
    const [formData, setFormData] = useState<IServerFormData>({
        name: "",
        capacity: 1,
    });
    const [formErrors, setFormErrors] = useState<any>({
        name: "",
        capacity: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, isNumber: boolean = false) => {
        const { name, value } = event.target;

        setFormData((prevData: IServerFormData): IServerFormData => ({
            ...prevData,
            [name]: isNumber ? parseInt(value) : value,
        }));
    }

    const noNegativeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (parseInt(value) <= 0) {
            setFormData((prev: IServerFormData) => ({ ...prev, capacity: 1 }))
            return;
        }

        handleInputChange(event, true);
    }

    const resetErrors = () => {
        setFormErrors({
            name: "",
            capacity: ""
        });
    }

    const handleCreate = (data: IServerFormData) => {
        resetErrors();
        let hasError = false;
        if (data.name === "") {
            hasError = true;
            setFormErrors((prev: any) => ({
                ...prev,
                name: "Name cannot be empty"
            }))
        }

        if (!data.capacity || (typeof (data.capacity) !== 'number')) {
            hasError = true;
            setFormErrors((prev: any) => ({
                ...prev,
                capacity: "Capacity must be a valid input"
            }))
        }

        if (hasError) {
            return;
        }


        const newData: Server = {
            name: data.name,
            capacity: data.capacity,
            load: 0
        }
        setServers((prev: Server[]) => {
            const returnable = [...prev];
            returnable.push(newData);
            return returnable;
        })

        resetForm()
    }

    function resetForm() {
        setFormData({
            name: "",
            capacity: 1
        })
    }

    useEffect(() => {
        console.log(formErrors);
    }, [formErrors])


    return (
        <>
            <div
                className='flex flex-col justify-between h-full'
            >
                <div>
                    <FormItem
                        changeHandler={handleInputChange}
                        name="name"
                        type="text"
                        value={formData.name}
                        error={{
                            formErrors,
                            setFormErrors,
                        }}
                    />
                    <FormItem
                        changeHandler={noNegativeInput}
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        error={{
                            formErrors,
                            setFormErrors,
                        }}
                    />
                </div>
                <div
                    className='flex flex-col'
                >
                    <button
                        className='py-3 rounded shadow bg-blue-500 text-white uppercase text-center hover:bg-blue-800 transition-all duration-200'
                        onClick={() => handleCreate(formData)}
                    >
                        Create
                    </button>
                </div>
            </div>
        </>
    )
}
