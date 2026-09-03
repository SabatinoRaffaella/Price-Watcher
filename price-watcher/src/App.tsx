import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Zoteboard from './components/Dashboard/Dasboard'

function App() {

  return (
    <>
      <Navbar></Navbar>
      <Zoteboard></Zoteboard> 
      <section id="center">
        <div className="hero">
        </div>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
