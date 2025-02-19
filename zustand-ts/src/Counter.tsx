import React from "react"
import useCouterStore from "./couterStore"

const Counter:React.FC = () => {

    const { count, increase, decrease, reset }=useCouterStore()

  return (
    <div>
    <h1>Count: { count }</h1>
    <button onClick={increase} >Increase</button>
    <button onClick={decrease} >Decrease</button>
    <button onClick={reset} >Reset</button>
    </div>
  )
}

export default Counter;
