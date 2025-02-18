import Counter from './Counter'
import Auth from './Auth'
import { StoreProvider } from './StoreProvider'

export default function App() {
  return (
    <StoreProvider>
      <Counter />
      <Auth />
    </StoreProvider>
  )
}
