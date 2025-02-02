import { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [ color, setColor ] = useState<string>('black'); 

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
      <h1>Enter or select color</h1>
      <div className="card">
      <input 
        style={{ marginBottom: '10px'}}
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
