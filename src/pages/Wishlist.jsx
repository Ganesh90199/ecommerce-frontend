import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const moveToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (exists) {

      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
            ...item,
            cartQuantity:
              item.cartQuantity + 1,
          }
          : item
      );

    } else {

      updatedCart = [
        ...cart,
        {
          ...product,
          cartQuantity: 1,
          quantity:
            product.quantity ||
            product.stock ||
            0,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Moved To Cart");
  };

  return (
    <div className="container py-4">

      <h2 className="mb-4">
        ❤️ My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <div className="alert alert-info">
          No products in wishlist.
        </div>
      ) : (
        <div className="row">

          {wishlist.map((product) => (
            <div
              className="col-md-3 mb-4"
              key={product.id}
            >
              <div className="card h-100 shadow-sm">

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">

                  <h5>{product.name}</h5>

                  <h6 className="text-success">
                    ₹{product.price}
                  </h6>

                  <div className="d-grid gap-2">

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        moveToCart(product)
                      }
                    >
                      Move To Cart
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeFromWishlist(product.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;