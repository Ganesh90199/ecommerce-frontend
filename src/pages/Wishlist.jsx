import { useEffect, useState } from "react";
import {
  addToCart as addToCartApi
} from "../services/cartService";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const userEmail =
    localStorage.getItem("userEmail");

  const wishlistKey =
    `wishlist_${userEmail}`;

  useEffect(() => {


    const savedWishlist =
      JSON.parse(
        localStorage.getItem(wishlistKey)
      ) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      wishlistKey,
      JSON.stringify(updatedWishlist)
    );
    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  const moveToCart = async (product) => {

    try {

      await addToCartApi(
        product.id,
        1
      );

      removeFromWishlist(
        product.id
      );

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

      alert("Moved To Cart");

    } catch (error) {

      console.log(error);

      alert("Failed To Move");
    }
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
              <div className="card h-100 shadow-sm position-relative">

                <button
                  className="btn position-absolute top-0 end-0 m-2 border-0 fs-4"
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    zIndex: 10
                  }}
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  ❤️
                </button>

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />


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
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;