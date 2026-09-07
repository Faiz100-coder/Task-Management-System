// import React from "react";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Tasks from "./components/Tasks";

// function App() {
//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Header />
//       <div className="flex-grow-1">
//         <Tasks />
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default App;
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";

export default function App() {
  return (
    <>
      <Header />
      <Tasks />
      <Footer />
    </>
  );
}
