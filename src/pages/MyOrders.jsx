import { useEffect, useState } from "react";
import {
  getMyOrders,
  cancelOrder
} from "../services/orderService";
function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const response =
        await getMyOrders();

      setOrders(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCancelOrder =
    async (id) => {

      try {

        await cancelOrder(id);

        loadOrders();

      } catch (error) {

        console.log(error);

        alert(
          "Unable to cancel order"
        );
      }
    };

  return (
    <div className="container py-4">

      <h2 className="mb-4">
        📦 My Orders
      </h2>

      {
        orders.length === 0 ? (

          <div className="alert alert-info">
            No Orders Found
          </div>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="card shadow-sm mb-4"
            >
              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <h5>
                      Order #{order.id}
                    </h5>

                    <small>
                      {
                        order.orderDate
                          ? new Date(order.orderDate)
                            .toLocaleString()
                          : "N/A"
                      }
                    </small>

                  </div>

                  <span
                    className={
                      order.status === "DELIVERED"
                        ? "badge rounded-pill bg-success px-3 py-2"
                        : order.status === "SHIPPED"
                          ? "badge rounded-pill bg-primary px-3 py-2"
                          : order.status === "CANCELLED"
                            ? "badge rounded-pill bg-danger px-3 py-2"
                            : "badge rounded-pill bg-warning text-dark px-3 py-2"
                    }
                    style={{
                      fontSize: "14px",
                      minWidth: "110px"
                    }}
                  >
                    {order.status}
                  </span>

                </div>

                <hr />

                <h6 className="mb-3">
                  Ordered Items
                </h6>

                {
                  order.items?.map((item, index) => (

                    <div
                      key={index}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>
                        {item.productName}
                      </span>

                      <span>
                        {item.quantity} × ₹{item.price}
                      </span>

                    </div>

                  ))
                }

                <hr />

                <h5 className="text-success">
                  Total Amount: ₹{order.totalAmount}
                </h5>
                <hr />

                <div className="mt-3">

                  <h6 className="fw-bold">
                    📍 Delivery Address
                  </h6>

                  <div className="border rounded p-3 bg-light">

                    <div>
                      <strong>
                        {order.customerName}
                      </strong>
                    </div>

                    <div>
                      📞 {order.mobile}
                    </div>

                    <div>
                      {order.address}
                    </div>

                    <div>
                      {order.city}
                    </div>

                    <div>
                      PIN - {order.pincode}
                    </div>

                  </div>

                </div>
                {
                  order.status === "PLACED" && (

                    <button
                      className="btn btn-danger mt-3"
                      onClick={() =>
                        handleCancelOrder(
                          order.id
                        )
                      }
                    >
                      Cancel Order
                    </button>

                  )
                }

              </div>
            </div>

          ))

        )
      }

    </div>
  );
}

export default MyOrders;