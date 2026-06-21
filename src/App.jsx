import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  useEffect(() => {

    const handleToast = (event) => {

      setToastMessage(
        event.detail.message
      );

      setShowToast(true);

      setTimeout(() => {

        setShowToast(false);

      }, 3000);
    };

    window.addEventListener(
      "showToast",
      handleToast
    );

    return () => {

      window.removeEventListener(
        "showToast",
        handleToast
      );
    };

  }, []);

  return (
    <>
      <Navbar />

      <Toast
        show={showToast}
        message={toastMessage}
      />

      <main
        style={{
          paddingTop: "76px",
          minHeight:
            "calc(100vh - 76px)"
        }}
      >
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;