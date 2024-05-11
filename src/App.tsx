import { useState } from 'react'
import { Outlet } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' // public folder
import './App.css'


export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      This is the main page...
      <Outlet/>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}
