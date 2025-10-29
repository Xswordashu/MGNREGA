import { Routes, Route } from "react-router-dom";
// import ViewAllMgnregaDetails from "./pages/view";
import DetailView from "./pages/details";
import { StateSelection } from "./pages/StateSelection";
import DistrictSelection from "./pages/DistrictSelection";
import ViewAllMgnregaDetails from "./pages/view";



function App() {
  return (
    <Routes>
      <Route path="/" element={<StateSelection />} />
      <Route path="/view" element={<ViewAllMgnregaDetails />} />
      <Route path="/districts" element={<DistrictSelection />} />
      <Route path="/details/:id" element={<DetailView />} />

      {/* <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;