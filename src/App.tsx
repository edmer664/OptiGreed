import './App.css'
import MainApp from './components/MainApp';
import { GlobalProvider } from './context/GlobalContext';



function App() {
  return (
    <>
      <GlobalProvider>
        <MainApp />
      </GlobalProvider>
    </>
  )
}

export default App
