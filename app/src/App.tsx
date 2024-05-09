import { useState } from "react";
import logo from "./logo.svg";
import { ConnectButton } from "./components/ConnectButton";
import { Greeter } from "./Greeter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex flex-col items-center justify-center bg-[#282c34] text-white">
        <img
          src={logo}
          className="animate-speed h-60 motion-safe:animate-spin pointer-events-none"
          alt="logo"
        />
        <p className="mt-3">
          <button
            type="button"
            className="my-6 rounded bg-gray-300 px-2 py-2 text-[#282C34] transition-all hover:bg-gray-200"
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </button>
        </p>
      </header>
      <ConnectButton />
      <Greeter />
    </div>
  );
}

export default App;
