import { ConnectButton } from "./components/ConnectButton";
import { Greeter } from "./Greeter";
import { cn } from "./utils/helpers";

function App() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center min-h-screen',
      )}
    >
      <ConnectButton />
      <Greeter />
    </div>
  );
}

export default App;
