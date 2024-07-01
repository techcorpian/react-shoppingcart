import { useState, useEffect } from 'react'
import Header from './components/Header';
import Banner from './components/Banner';
import Product from './components/Product';
import Footer from './components/Footer';
import './App.css'

function App() {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5175/products.json")
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data.length > 0) {
          setProducts(result.data);
        }
      });
  }, []);

  function handleAddToCart(data) {
    const cartCopy = [...cart];
    cartCopy.push(data);
    setCart(cartCopy);
  }

  function handleRemoveFromCart(data) {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.id != data.id);
    setCart(cartCopy);
  }

  function findCartStatus(product = {}) {
    return cart.some((d) => d.name == product.name);
  }

  return (
    <>
      {/* header */}
      <Header quantity={cart.length}/>
      <Banner />


      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product, index) => (
              <Product               
              key={`${product.name}-${index}`}
              data={product}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              isAddedToCart={findCartStatus(product)}/>
            ))}

          </div>
        </div>
      </section>
      <Footer />

    </>
  )
}

export default App
