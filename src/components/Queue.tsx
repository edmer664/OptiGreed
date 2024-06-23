import  { useContext } from 'react'
import { Job } from '../types/Types';
import { GlobalContext } from '../context/GlobalContext';

export default function Queue() {

    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error('ThemeSwitcher must be used within a Provider');
    }

    const { jobs } = globalContext;
    return (
        <>
            <div
                className='w-full p-5 min-h-28 overflow-x-scroll overflow-y-hidden bg-white shadow-lg rounded-lg'>
                <h2>
                    JOB QUEUE
                </h2>

                <div
                    className='flex gap-2 mt-3'
                >
                    {jobs.map((job) => (
                        <>
                            <JobEntry
                                key={job.id}
                                job={job} />

                        </>
                    ))}
                </div>


            </div>

        </>
    )
}


function JobEntry({ job }: { job: Job }) {
    return <>

        <div
            className='rounded-full w-24 h-24 bg-yellow-500 shadow text-center p-5 aspect-square hover:bg-yellow-400 transition-all duration-200'
        >
            <h3 className='text-white'>
                {job.id}
            </h3>
            <small className='text-xs text-white'>
                diff: {job.difficulty}
            </small>
        </div>

    </>
}