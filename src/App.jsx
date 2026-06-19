import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <>
      <Navbar />

      <main
        style={{
          paddingTop: "76px",
          minHeight: "calc(100vh - 76px)"
        }}
      >
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;