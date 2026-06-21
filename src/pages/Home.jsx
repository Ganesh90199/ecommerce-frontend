import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
function Home() {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await getAllProducts();

      setFeaturedProducts(
        response.data.slice(0, 4)
      );

      setDealProducts(
        response.data.slice(4, 7)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">
                Welcome to E-Commerce Store
              </h1>

              <p className="lead mt-3">
                Mobiles, Laptops, Electronics,
                Fashion and Books at the best prices.
              </p>

              <Link
                to="/products?category=Mobiles"
                className="text-decoration-none"
              >
                Shop Now
              </Link>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://picsum.photos/700/350"
                alt="Banner"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-5">

        <h2 className="text-center mb-4">
          Shop By Category
        </h2>

        <div className="row justify-content-center g-4">
          <div className="col-lg-2 col-md-4 col-sm-6">
            <Link
              to="/products?category=Mobiles"
              className="text-decoration-none"
            >
              <div className="card shadow-sm text-center h-100">
                <div className="card-body">
                  <h1>📱</h1>
                  <h6>Mobiles</h6>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">
            <Link
              to="/products?category=Laptops"
              className="text-decoration-none"
            >
              <div className="card shadow-sm text-center h-100">
                <div className="card-body">
                  <h1>💻</h1>
                  <h6>Laptops</h6>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">
            <Link
              to="/products?category=Electronics"
              className="text-decoration-none"
            >
              <div className="card shadow-sm text-center h-100">
                <div className="card-body">
                  <h1>🎧</h1>
                  <h6>Electronics</h6>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">
            <Link
              to="/products?category=Fashion"
              className="text-decoration-none"
            >
              <div className="card shadow-sm text-center h-100">
                <div className="card-body">
                  <h1>👕</h1>
                  <h6>Fashion</h6>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">
            <Link
              to="/products?category=Books"
              className="text-decoration-none"
            >
              <div className="card shadow-sm text-center h-100">
                <div className="card-body">
                  <h1>📚</h1>
                  <h6>Books</h6>
                </div>
              </div>
            </Link>
          </div>

        </div>

      </section>

      {/* Featured Products */}
      <section className="bg-light py-5">

        <div className="container">

          <h2 className="text-center mb-4">
            Featured Products
          </h2>

          <div className="row">

            {featuredProducts.map((product) => (
              <div
                className="col-lg-3 col-md-6 mb-4"
                key={product.id}
              >
                <div className="card shadow-sm h-100">

                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "contain"
                    }}
                  />
                  <div className="card-body text-center">


                    <h5>{product.name}</h5>

                    <h6 className="text-success">
                      ₹{product.price}
                    </h6>

                    <Link
                      to={`/product/${product.id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Today's Deals */}
      <section className="container py-5">

        <h2 className="text-center mb-4">
          Today's Deals
        </h2>

        <div className="row">

          {dealProducts.map((product) => (

            <div
              className="col-md-4 mb-3"
              key={product.id}
            >

              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none"
              >

                <div className="card border-success shadow-sm">

                  <div className="card-body text-center">

                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="img-fluid rounded"
                      style={{
                        height: "350px",
                        width: "100%",
                        objectFit: "contain"
                      }}
                    />

                    <h5>{product.name}</h5>
                    <h6
                      className="text-muted text-decoration-line-through"
                    >
                      ₹{Math.round(product.price * 1.25)}
                    </h6>

                    <h4 className="text-success">
                      ₹{product.price}
                    </h4>

                    <span className="badge bg-danger">
                      {Math.round(
                        (
                          (product.price * 1.25 - product.price)
                          /
                          (product.price * 1.25)
                        ) * 100
                      )}% OFF
                    </span>
                    <p className="text-success mt-2 fw-bold">
                      Save ₹
                      {
                        Math.round(
                          product.price * 0.25
                        )
                      }
                    </p>
                  </div>

                </div>

              </Link>

            </div>

          ))}

        </div>

      </section>

      {/* Why Choose Us */}
      <section className="bg-light py-5">

        <div className="container">

          <h2 className="text-center fw-bold mb-5">
            Why Choose Us
          </h2>

          <div className="row g-4">

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body py-4">

                  <div
                    className="mx-auto mb-3 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "30px"
                    }}
                  >
                    🚚
                  </div>

                  <h5 className="fw-bold">
                    Fast Delivery
                  </h5>

                  <p className="text-muted mb-0">
                    Get your products delivered
                    quickly and safely.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body py-4">

                  <div
                    className="mx-auto mb-3 rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "30px"
                    }}
                  >
                    🔒
                  </div>

                  <h5 className="fw-bold">
                    Secure Payment
                  </h5>

                  <p className="text-muted mb-0">
                    Multiple secure payment
                    options for your safety.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body py-4">

                  <div
                    className="mx-auto mb-3 rounded-circle bg-warning d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "30px"
                    }}
                  >
                    ↩️
                  </div>

                  <h5 className="fw-bold">
                    Easy Returns
                  </h5>

                  <p className="text-muted mb-0">
                    Hassle-free returns and
                    customer-friendly policies.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card border-0 shadow-sm h-100 text-center">
                <div className="card-body py-4">

                  <div
                    className="mx-auto mb-3 rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
                    style={{
                      width: "70px",
                      height: "70px",
                      fontSize: "30px"
                    }}
                  >
                    ⭐
                  </div>

                  <h5 className="fw-bold">
                    Quality Products
                  </h5>

                  <p className="text-muted mb-0">
                    Carefully selected products
                    from trusted brands.
                  </p>

                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;