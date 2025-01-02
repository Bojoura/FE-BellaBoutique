import './App.css'
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Bar from "./components/bar/Bar";
import AppRoutes from "./Routes.jsx";

function App() {
  return (
    <>
        <header>
            <Navbar/>
            <Bar/>
        </header>

        <main>
           <AppRoutes />
        </main>

        <Footer
        year={new Date().getFullYear()}
        companyName="Bella's Boutique"
        text="Alle rechten voorbehouden."
        />

    </>
  )
}

export default App
