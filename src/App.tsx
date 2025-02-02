import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ color, setColor ] = useState('black'); 

  const onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      }
    });
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Enter or select color</h1>
      <div className="card">
      <input 
          type="text" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          placeholder="Enter color" 
        />
        <input type="color" onChange={(e) => setColor(e.currentTarget.value)}></input>
        <button onClick={() => onclick()}>
          Click me!
        </button>
      </div>
    </>
  )
}

export default App
