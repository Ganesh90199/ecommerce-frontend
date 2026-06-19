import { Link } from "react-router-dom";

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15",
      price: 80000,
      image: "https://picsum.photos/300?1",
    },
    {
      id: 5,
      name: "MacBook Pro",
      price: 120000,
      image: "https://picsum.photos/300?5",
    },
    {
      id: 13,
      name: "Nike Shoes",
      price: 2999,
      image: "https://picsum.photos/300?13",
    },
    {
      id: 18,
      name: "Python Book",
      price: 699,
      image: "https://picsum.photos/300?18",
    },
  ];

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
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
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

          <div className="col-md-4 mb-3">
            <Link
              to="/product/1"
              className="text-decoration-none"
            >
              <div className="card border-success shadow-sm">
                <div className="card-body text-center">
                  <h5>📱 iPhone 15</h5>
                  <p>20% OFF</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-3">
            <Link
              to="/product/5"
              className="text-decoration-none"
            >
              <div className="card border-warning shadow-sm">
                <div className="card-body text-center">
                  <h5>💻 MacBook Pro</h5>
                  <p>15% OFF</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-3">
            <Link
              to="/product/13"
              className="text-decoration-none"
            >
              <div className="card border-info shadow-sm">
                <div className="card-body text-center">
                  <h5>👟 Nike Shoes</h5>
                  <p>30% OFF</p>
                </div>
              </div>
            </Link>
          </div>

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