import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Footer from "./components/Footer/Footer";
import Demonstration from "./pages/singleProduct/Demonstration/Demonstration";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}>
              <Route path="produto/ecolift-50" element={<SingleProduct/>} />
              <Route path="demonstracao" element={<Demonstration/>} />
              <Route path="como-funciona" element={<Demonstration/>} />
              <Route path="aluguel" element={<Demonstration/>} />
            </Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>

  );
}

export default App;
