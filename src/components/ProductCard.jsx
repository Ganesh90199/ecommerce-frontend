function ProductCard({ product }) {
    return (
        <div className="col-lg-2 col-md-3 col-sm-6 mb-3">

            <div className="card h-100 shadow-sm">

                <img
                    src={product.imageUrl}
                    className="card-img-top"
                    alt=""
                    style={{
                        height: "120px",
                        objectFit: "contain",
                    }}
                />

                <div className="card-body">

                    <h6 className="mb-1">{product.name}</h6>
                    <p className="text-muted">
                        {product.category}
                    </p>

                    <h4 className="text-success">
                        ₹{product.price}
                    </h4>

                    <button className="btn btn-primary btn-sm w-100">
                        Add To Cart
                    </button>

                </div>
            </div>

        </div>
    );
}

export default ProductCard;