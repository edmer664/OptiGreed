import  { useContext } from 'react'
import { Server } from '../types/Types'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GlobalContext } from '../context/GlobalContext';


export default function Servers() {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error('ThemeSwitcher must be used within a Provider');
      }

    const { servers} = globalContext;


    return (
        <>
            <div
                className='max-h-[75vh] h-[75vh] overflow-scroll pb-20 p-5 border rounded-lg shadow-lg bg-gray-50'>
                <div
                    className='grid grid-cols-3 gap-5 '
                >
                    {servers.map((server) => (<>
                        <ServerItem server={server} />

                    </>))}


                </div>
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
                className='w-full'
            >
                <Doughnut
                    data={{
                        datasets: [{
                            data: [server.load / server.capacity * 100, 100 - (server.load / server.capacity * 100)
                            ],
                            backgroundColor: [
                                '#ff555a',
                                '#66dd66'
                            ]
                        }],
                        labels: [
                            'In Use',
                            'Available'
                        ]
                    }}
                    options={{ responsive: true, maintainAspectRatio: true }}
                />
            </div>

            <p>
                <b>Server Load: </b> {server.load} / {server.capacity}
            </p>


        </div>)
}
