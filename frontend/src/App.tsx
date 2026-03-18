import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/app.routes"

function App() {


  return (
    <>
      <BrowserRouter>
       <Toaster position="top-center" reverseOrder={false} />
       <AppRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
