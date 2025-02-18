// import useAuthStore from "./store/authStore"
import { useStore } from "./StoreProvider"

export default function Auth() {
    const { authStore } = useStore()
    const { user, login, logout } = authStore

  return (
    <>
    <div>
        {
            user?(
                <>
                    <h2>Welcome, {user.name}!</h2>
                    <button onClick={logout} >Logout</button>
                </>
            ):(
                <button onClick={()=>login({ name: "Hayatullah" })} >Login</button>
            )
        }
    </div>
    </>
  )
}
