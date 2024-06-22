import React from "react";

export interface Server {
    name: string,
    capacity: number,
    load: number,
}

export interface Job {
    id: string,
    difficulty: number,
}

export interface IGlobalContext {
    servers: Server[],
    setServers: React.Dispatch<React.SetStateAction<Server[]>>,
    jobs: Job[],
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>,
}