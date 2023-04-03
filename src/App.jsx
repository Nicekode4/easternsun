import AppRouter from "./AppRouter/AppRouter"
import Navbar from "./Components/NavBar/Navbar";
import GlobalStyle from "./Global.style"
function App() {
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
