import React, { useContext } from 'react'
import { Server } from '../types/Types'
import { GlobalContext } from '../App'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from "chart.js";


export default function Servers() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const { servers } = useContext(GlobalContext);


    return (
        <>
            <div
                className='grid grid-cols-3 gap-2 max-h-[80vh] overflow-scroll py-5'
            >
                {servers.map((server) => (<>
                    <ServerItem server={server} />

                </>))}


            </div>

        </>
    )
}

function ServerItem({ server }: { server: Server }) {
    return (
        <div
            className='shadow-lg bg-white rounded-lg flex flex-col items-center p-5 gap-2'
        >
            <h2>
                {server.name}
            </h2>
            <div
                className='w-full h-full'
            >
                <Doughnut
                    data={{
                        datasets: [{
                            data: [server.load / server.capacity * 100, 100 - (server.load / server.capacity * 100)
                            ],
                            backgroundColor:[
                                '#ff555a',
                                '#66dd66'
                            ]
                        }],
                        labels:[
                            'In Use',
                            'Available'
                        ]
                    }}
                />
            </div>

            <p>
                <b>Server Load: </b> {server.load} / {server.capacity}
            </p>


        </div>)
}
