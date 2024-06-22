import { Job, Server } from "../types/Types";

export default function loadBalancer(servers: Server[], job: Job) {
    let bestServer: Server | null = null;
    let maxAvailableCapacity = -1;

    for (let server of servers) {
        let availableCapacity = server.capacity - server.load;
        if (availableCapacity >= job.difficulty && availableCapacity > maxAvailableCapacity) {
            bestServer = server;
            maxAvailableCapacity = availableCapacity;
        }
    }

    // If a suitable server is found, assign the job to that server
    if (bestServer !== null) {
        bestServer.load += job.difficulty;
    } else {
        console.error(`No suitable server found for job ${job.id} with difficulty ${job.difficulty}`);
        throw new Error(`No suitable server found for job ${job.id} with difficulty ${job.difficulty}`);

    }

    return servers;

}