import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { FaWind } from 'react-icons/fa';
import { BsFillDropletFill } from 'react-icons/bs';
import { GiWindsock } from 'react-icons/gi';
import { useState, useEffect } from 'react';



function App() {


  const [location, setLocation] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation(position.coords.latitude + "," + position.coords.longitude);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // add you key in the specified location
  const url = `https://api.weatherapi.com/v1/current.json?key=/*Add your key here*/&q=${location ? location : ""}&aqi=no`;


  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])



  useEffect(() => {
    const getProducts = async () => {
      if (!location) {
        setLoading(true)
      } else {
        const response = await fetch(url)
        const products = await response.json()
        setProducts(products)
        setLoading(false)

      }
    }

    getProducts();

  }, [url, location])



  return (

    <div className="container-bg container my-5 d-flex justify-content-center align-items-center" >
      <div className="row text-white">
        <div className="col-md-12">
          {loading ? <h1>Lodaing...</h1> : <>
            <h1 className="text-center mb-4">{products.location.country},{products.location.name}</h1>
            <h3 className="text-center mb-3 ">{products.current.condition.text}</h3>
            <div className="d-flex gap-3 anim flex-column align-items-center justify-content-center mt-5" /* style={{ border: "2px solid red" }} */>
              <div className="d-flex align-items-center justify-content-center gap-3 ">
                <img src={products.current.condition.icon} alt="" className="img-fluid w-50" />
                <h1>{products.current.temp_c}℃</h1>
              </div>
              <div className="row mt-3">
                <div className="col lg-4 d-flex align-items-center gap-2">
                  <FaWind className="fs-3" />
                  <h4>{products.current.gust_mph}</h4>
                </div>
                <div className="col lg-4 d-flex align-items-center gap-1">
                  <BsFillDropletFill className="fs-3" />
                  <h3>{products.current.humidity}%</h3>
                </div>
                <div className="col lg-4 d-flex align-items-center gap-2">
                  <GiWindsock className="fs-3" />
                  <h3>{products.current.wind_dir}</h3>
                </div>
              </div>
            </div>
          </>
          }

        </div>
      </div>
    </div>

  );
}

export default App;
