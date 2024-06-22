import React, { useContext, useEffect, useState } from 'react'
import FormItem from './FormItem';
import { Job } from '../../types/Types';
import { GlobalContext } from '../../context/GlobalContext';

interface IJobFormData {
    id: string,
    difficulty: number,
}

export default function AddJobForm() {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error('ThemeSwitcher must be used within a Provider');
    }

    const { setJobs } = globalContext;
    const [formData, setFormData] = useState<IJobFormData>({
        id: (Math.round(Math.random() * 10000)).toString(),
        difficulty: Math.round(Math.random() * 100),
    });
    const [formErrors, setFormErrors] = useState<{ name: string, capacity: string }>({
        name: "",
        capacity: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, isNumber: boolean = false) => {
        const { name, value } = event.target;

        setFormData((prevData: IJobFormData): IJobFormData => ({
            ...prevData,
            [name]: isNumber ? parseInt(value) : value,
        }));
    }

    const noNegativeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (parseInt(value) <= 0) {
            setFormData((prev: IJobFormData) => ({ ...prev, capacity: 1 }))
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

    const handleCreate = (data: IJobFormData) => {
        resetErrors();
        let hasError = false;
        if (data.id === "") {
            hasError = true;
            setFormErrors((prev: any) => ({
                ...prev,
                id: "id cannot be empty"
            }))
        }

        if (!data.difficulty || (typeof (data.difficulty) !== 'number')) {
            hasError = true;
            setFormErrors((prev: any) => ({
                ...prev,
                difficulty: "difficulty must be a valid input"
            }))
        }

        if (hasError) {
            return;
        }


        const newData: Job = {
            id: data.id,
            difficulty: data.difficulty
        }
        setJobs((prev: Job[]) => {
            const returnable = [...prev];
            returnable.push(newData);
            return returnable;
        })

        resetForm();
    }

    const resetForm = () => {
        setFormData({
            id: (Math.round(Math.random() * 10000)).toString(),
            difficulty: Math.round(Math.random() * 100),
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
                        name="id"
                        type="text"
                        value={formData.id}
                        error={{
                            formErrors,
                            setFormErrors,
                        }}
                    />
                    <FormItem
                        changeHandler={noNegativeInput}
                        name="difficulty"
                        type="number"
                        value={formData.difficulty}
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
