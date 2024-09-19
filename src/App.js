import Button from './components/button';
import './index.css';

import { FcRefresh } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";


const Header = () => (
  <header className="flex justify-between items-center p-4 border-2 bg-gray-100">
    <div className="flex items-center h-[55px] overflow-hidden p-2">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnk0Pdm1QoRzmOVTJdG4bCA0QzG0gxbhMFg&s" alt="Logo" className="h-full w-auto object-cover mr-2" />
      <h1 className="text-xl font-semibold">Tasks</h1>
    </div>
    <div className="flex space-x-4">
      <Button variant={'primary'} children={'New Task'} />
      <Button variant={'ghost'}>
        <FcRefresh />
      </Button>
    </div>
  </header>
);

const StripHeader = ({ taskCount, searchValue }) => (
  <div className="flex justify-between items-center p-5 border-b">
    <div className="text-lg font-medium">
      {taskCount} {`Record${taskCount !== 1 ? 's' : ''}`}
    </div>
    <div className="flex items-center w-[275px] border bg-gray-100 text-gray-500 rounded">
      <input
        type="text"
        value={searchValue}
        placeholder="Search Tasks"
        className="flex-grow p-2 outline-none bg-gray-100 text-gray-500 rounded-l"
      />
      <div className="p-2">
       <Button variant={'ghost'}><BsSearch className="text-gray-500" /></Button> 
      </div>
    </div>
  </div>
);

function App() {

  return (
    <>
      <Header />
      <StripHeader taskCount={5}/>
    </>
  );
}

export default App;
