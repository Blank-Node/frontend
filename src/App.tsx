import { Branding } from './Components/Branding'
import './App.css'
import AnimatedLines from './Components/Viz/AnimatedLines'

function App() {

  return (
    <>
      <Branding>
        <div style={{ height: window.innerHeight - 60 }}>
          <AnimatedLines />
        </div>
      </Branding>
    </>
  )
}

export default App
