import React from 'react'

interface IFormItem {
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
    type: string,
    value: any,
    error: {
        formErrors: any,
        setFormErrors: React.Dispatch<React.SetStateAction<any>>
    }
}
export default function FormItem(props: IFormItem) {
    const hasError = props.error.formErrors[props.name];

    return (
        <>
            <div
                className='flex flex-col my-2'
            >
                <label
                >
                    {props.name.toUpperCase()}
                </label>
                <input
                    className='border py-3 px-4 focus:shadow rounded'
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.changeHandler}
                />
                {hasError && <>
                    <small
                        className='text-red-500'>
                        {props.error.formErrors[props.name]}
                    </small>
                </>}
            </div>
        </>
    )
}
