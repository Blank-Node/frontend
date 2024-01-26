import { Branding } from './Components/Branding'
import './App.css'

function App() {

  return (
    <>
      <Branding>
        <div>
          <a href="https://blanknode.dev" target="_blank">
            <img src={'./img/BN__icon_300.png'} className="logo" alt="Blank Node" />
          </a>
        </div>

        <h1>Blank Node</h1>
      </Branding>
    </>
  )
}

export default App
