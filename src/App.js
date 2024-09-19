import './index.css';

import { FcRefresh } from "react-icons/fc";

const Header = () => (
  <header className="flex justify-between items-center p-4 border-2 bg-gray-100">
    <div className="flex items-center h-[55px] overflow-hidden p-2">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnk0Pdm1QoRzmOVTJdG4bCA0QzG0gxbhMFg&s" alt="Logo" className="h-full w-auto object-cover mr-2" />
      <h1 className="text-xl font-semibold">Tasks</h1>
    </div>
    <div className="flex space-x-4">
      <button>New Task</button>
      <button>
        <FcRefresh />
      </button>
    </div>
  </header>
);

function App() {

  return (
    <>
      <Header />
    </>
  );
}

export default App;
