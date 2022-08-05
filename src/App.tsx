import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Footer from "./components/Footer/Footer";
import Container from "./components/Container/Container";
import Demonstration from "./pages/singleProduct/Demonstration/Demonstration";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/">
              <Route path="/produto/ecolift-50" element={<SingleProduct/>} />
              <Route path="/demonstracao" element={<Demonstration/>} />
            </Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>

  );
}

export default App;
