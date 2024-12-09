import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <div className="flex flex-col min-h-screen gap-8">
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
