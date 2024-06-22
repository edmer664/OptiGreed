import React, { ReactNode, createContext, useState } from 'react'
import { IGlobalContext, Job, Server } from '../types/Types';

export const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {

    const [servers, setServers] = useState<Array<Server>>([]);
    const [jobs, setJobs] = useState<Array<Job>>([]);
    return (
        <GlobalContext.Provider value={{
            servers: servers,
            setServers: setServers,
            jobs: jobs,
            setJobs: setJobs,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


