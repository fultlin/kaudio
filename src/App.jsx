import Layout from "./components/Layout/component";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./App.module.scss";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
