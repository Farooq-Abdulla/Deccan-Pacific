import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { Home } from "./components/Home";

const Services = React.lazy(() => import("./components/Services"));
const About = React.lazy(() => import("./components/About"));
const ContactUs = React.lazy(() => import("./components/ContactUs"));
function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/About"
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/contactUs"
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <ContactUs />
                </Suspense>
              }
            />
            <Route
              path="/services"
              element={
                <Suspense fallback={<div>loading...</div>}>
                  <Services />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;