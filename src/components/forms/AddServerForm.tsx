import React, { useContext, useEffect, useState } from 'react'
import FormItem from './FormItem';
import { GlobalContext } from '../../App';
import { Server } from '../../types/Types';


interface IServerFormData {
    name: string, capacity: number
}
export default function AddServerForm() {
    const { servers, setServers } = useContext(GlobalContext);
    const [formData, setFormData] = useState<IServerFormData>({
        name: "",
        capacity: 1,
    });
    const [formErrors, setFormErrors] = useState<any>({
        name: "",
        capacity: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prevData: IServerFormData): IServerFormData => ({
            ...prevData,
            [name]: value
        }));
    }

    const noNegativeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (parseInt(value) <= 0) {
            setFormData((prev: IServerFormData) => ({ ...prev, capacity: 1 }))
            return;
        }

        handleInputChange(event);
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

        if (!data.capacity || (typeof(data.capacity) !== 'number')){
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
                        onClick={(e: any) => handleCreate(formData)}
                    >
                        Create
                    </button>
                </div>
            </div>
        </>
    )
}
