import { Outlet, useLocation } from "react-router";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();
  const hide = location.pathname === "/login";
  return (
    <>
      <header>{!hide && <Header />}</header>
      <main className="flex">
        {!hide && <Sidebar />}
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
