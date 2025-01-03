import {
  Button,
  Navbar as MTNavbar,
  Typography,
} from "@material-tailwind/react";
import { useUser } from "./lib/context/user";
import Home from "./pages/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
