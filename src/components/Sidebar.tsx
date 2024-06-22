import React, { ReactElement, useState } from 'react'
import AddServerForm from './forms/AddServerForm';
import AddJobForm from './forms/AddJobForm';

export default function Sidebar() {
    const [mode, setMode] = useState<string>("server");

    const renderForms = (mode: string): ReactElement => {
        switch (mode) {
            case 'server':
                return <AddServerForm />;
            case 'job':
                return <AddJobForm />;
        }
        return <></>;
    }


    return (
        <>
            <div
                className='flex flex-col py-10 px-5 gap-5 rounded-lg shadow-lg bg-white h-full'
            >
                {/* Logo */}
                <div>
                    <h1 className='font-bold text-4xl text-center'>
                        <span className='text-blue-500'>opti</span><span className='text-green-500'>greed</span>
                    </h1>
                </div>

                {/* Selector */}
                <div className='flex border shadow rounded-lg'>
                    <SelectorItem name="server" currentSelection={mode} setSelection={setMode} />
                    <SelectorItem name="job" currentSelection={mode} setSelection={setMode} />
                </div>

                {/* Forms */}
                <div
                    className='flex-grow'
                >
                    {renderForms(mode)}
                </div>


            </div>
        </>
    )
}

interface ISelectorItemProp {
    name: string,
    currentSelection: string,
    setSelection: React.Dispatch<React.SetStateAction<string>>,
}
function SelectorItem(props: ISelectorItemProp) {

    const isSelected = props.name === props.currentSelection;

    const selectMode = () => {
        props.setSelection(props.name);
    }
    return (
        <button className={"flex-1 py-4 text-center transition-all duration-200 " + (isSelected ? "font-bold bg-white shadow-lg rounded-lg border" : "")}
            onClick={selectMode}
        >
            {props.name.charAt(0).toLocaleUpperCase() + props.name.slice(1)}
        </ button>
    )
}
