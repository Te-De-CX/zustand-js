// import useCounterStore from './store/counterStore'
import { useStore } from './StoreProvider'

export default function Counter() {
    const { counterStore } =  useStore()
    const {count, increase, decrease} = counterStore

  return (
    <>
        <div>
            <h1>Count: { count }</h1>
            <button onClick={increase} >Increase</button>
            <button onClick={decrease} >Decrease</button>
        </div>
    </>
  )
}
