import useStore from './store'

export default function Counter() {

    const {count, increase, decrease, reset} = useStore()

  return (
    <>
        <div>
            <h1>Count: { count }</h1>
            <button onClick={increase} >Increase</button>
            <button onClick={decrease} >Decrease</button>
            <button onClick={reset} >Reset</button>
        </div>
    </>
  )
}
