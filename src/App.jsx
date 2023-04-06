import AppRouter from "./AppRouter/AppRouter"
import Navbar from "./Components/NavBar/Navbar";
import GlobalStyle from "./Global.style"
import solarData from "./solcelle.json"
function App() {
  if (!localStorage.getItem('MyId')) {
    localStorage.setItem('MyId', solarData[0].sid)
  }
  return (
    <>
    <GlobalStyle />
    <div className="App">
      <AppRouter />
      <Navbar />
    </div>
    </>
  );
}

export default App;
