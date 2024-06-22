import { SetStateAction, createContext, useEffect, useState } from 'react';
import './App.css'
import { Job, Server, IGlobalContext } from './types/Types';
import Sidebar from './components/Sidebar';
import Servers from './components/Servers';

export const GlobalContext = createContext<IGlobalContext>({
  servers: [],
  setServers: function (value: SetStateAction<Server[]>): void {
    throw new Error('Function not implemented.');
  },
  jobs: [],
  setJobs: function (value: SetStateAction<Job[]>): void {
    throw new Error('Function not implemented.');
  }
});


function App() {


  const [servers, setServers] = useState<Array<Server>>([]);
  const [jobs, setJobs] = useState<Array<Job>>([]);
 
  useEffect(()=>{

    console.log(servers)
  },[servers])


  return (
    <>
      <GlobalContext.Provider value={{
        servers: servers,
        setServers: setServers,
        jobs: jobs,
        setJobs: setJobs,
      }}>
        <div className='grid grid-cols-3 w-full min-h-screen p-5 gap-5'>
          <aside className='col-span-1'>
            <Sidebar />
          </aside>
          <main className='col-span-2 flex flex-col gap-5'>

            <section>
              <Servers/>
            </section>

            <section>
              {/* <Queue/> */}
            </section>

          </main>
        </div>
      </GlobalContext.Provider>

    </>
  )
}

export default App
