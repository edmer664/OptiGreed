import React, { useContext, useEffect } from 'react'
import { Job, Server } from '../types/Types';
import loadBalancer from '../Utils/LoadBalancer';
import Sidebar from './Sidebar';
import Servers from './Servers';
import Queue from './Queue';
import { GlobalContext } from '../context/GlobalContext';

export default function MainApp() {

    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error('ThemeSwitcher must be used within a Provider');
      }

    const { servers, setServers, jobs, setJobs } = globalContext;

    useEffect(() => {
        const processJobs = setInterval(() => {
            processTasks(setServers);
            processQueue(servers, setServers, jobs, setJobs);
        }, 2000);

        return () => clearInterval(processJobs);

    }, [servers,jobs])

    function processQueue(
        servers: Server[],
        setServers: React.Dispatch<React.SetStateAction<Array<Server>>>,
        jobs: Job[],
        setJobs: React.Dispatch<React.SetStateAction<Array<Job>>>
    ) {
        console.log("Running1")
        console.table({servers,jobs});
        const newArray: Job[] = [...jobs];
        const nextJob: Job | undefined = newArray.shift();

        if (!nextJob) {
            return;
        }

        try {
            console.log("Running12")
            console.table({servers,jobs});
            const newServer = loadBalancer(servers, nextJob);
            if(newServer){
                setServers(newServer)
            }else{
                setServers(servers)
            }
        } catch (error) {
            return;
        }
        setJobs(newArray);
    

    }

    function processTasks(setServers: React.Dispatch<React.SetStateAction<Array<Server>>>) {
        setServers((prev: Server[]): Server[] => {
            return prev.map((val) => {
                const newVal = val;
                newVal.load -= 10

                if (newVal.load < 0) {
                    newVal.load = 0;
                }
                return newVal;
            })
        })
    }

    return (
        <div className='grid grid-cols-3 w-full min-h-screen p-5 gap-5'>
            <aside className='col-span-1'>
                <Sidebar />
            </aside>
            <main className='col-span-2 flex flex-col gap-5 relative'>

                <section>
                    <Servers />
                </section>

                <section
                    className='absolute bottom-0 right-0 left-0'
                >
                    <Queue />
                </section>

            </main>
        </div>
    )
}
