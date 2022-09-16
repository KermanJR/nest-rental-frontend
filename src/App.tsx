import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom';
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Footer from "./components/Footer/Footer";
import Demonstration from "./pages/Demonstration/Demonstration";
import Home from "./pages/Home/Home";
import { Checkout } from "./pages/Checkout/Checkout";
import { CheckoutContext } from "./context/CheckoutContext";
import { Document } from "./pages/Document/Document";
import { Login } from "./pages/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
      <CheckoutContext>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="produto/ecolift-50" element={<SingleProduct/>} />
            <Route path="demonstracao" element={<Demonstration/>} />
            <Route path="checkout" element={<Checkout/>} />
            <Route path="contrato" element={<Document/>} />
            <Route path="/login/*" element={<Login/>}/>
          </Routes>
          <Footer/>
        </CheckoutContext>
      </BrowserRouter>
    </>

  );
}

export default App;
