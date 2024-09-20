import React, { useState } from 'react';

import Button from './components/button';
import './index.css';

import { FcRefresh } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";

import { BsThreeDotsVertical } from 'react-icons/bs';

import { sampleTasks } from './db';

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

const StripHeader = ({ taskCount, searchValue, setSearchValue, onSearch }) => (
  <div className="flex justify-between items-center p-4 border-b">
    <div className="text-lg font-medium">
      {taskCount} {`Record${taskCount !== 1 ? 's' : ''}`}
    </div>
    <div className="flex items-center w-[275px] border bg-gray-100 text-gray-500 rounded">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Tasks"
        className="flex-grow px-4 outline-none bg-gray-100 text-gray-500 rounded-l"
      />
      <div className="p-2">
        <Button variant={'ghost'} onClick={onSearch}><BsSearch className="text-gray-500" /></Button>
      </div>
    </div>
  </div>
);

const TaskList = ({ taskToDisplay }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (taskId) => {
    setOpenDropdown(openDropdown === taskId ? null : taskId);
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="w-full text-left bg-gray-100">
          <th className="py-2 px-4">Select</th>
          <th className="py-2 px-4">Assigned To</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Due Date</th>
          <th className="py-2 px-4">Priority</th>
          <th className="py-2 px-4">Comments</th>
          <th className="py-2 px-4 size-2"></th>
        </tr>
      </thead>
      <tbody>
        {taskToDisplay.length > 0 ? (
          taskToDisplay.map((task, index) => (
            <tr key={index} className="hover:bg-gray-50 border-b">
              <td className="py-2 px-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="py-2 px-4">{task.assignedTo}</td>
              <td className="py-2 px-4">{task.status}</td>
              <td className="py-2 px-4">{task.dueDate}</td>
              <td className="py-2 px-4">{task.priority}</td>
              <td className="py-2 px-4">{task.comments}</td>
              <td className="py-2 px-4 relative">
                <button
                  onClick={() => toggleDropdown(task.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <BsThreeDotsVertical />
                </button>

                {openDropdown === task.id && (
                  <div className="absolute right-8 mt-2 w-28 z-20 bg-white border border-gray-200 rounded shadow-lg">
                    <Button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 m-2"
                      children={'edit'}
                    />
                    <Button
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 m-2"
                      children={'Delet'}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-4 text-center text-gray-500">
              No tasks available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const Pagination = ({ currentPage, totalPages, changePage }) => {

  // const [changePage, setChangePage] = useState(1)

  const onlyFisrtPage = () => {
    changePage(1);
  }
  const onlyLastPage = () => {
    changePage(totalPages);
  }
  const toPrevPage = () => {
    changePage(currentPage > 0 ? currentPage - 1 : 0);
  }
  const toNextPage = () => {
    changePage(currentPage === totalPages ? currentPage : currentPage + 1);
  }

  return (
    <div className="flex justify-center mt-4">
      <Button
        className="px-4 py-1 mx-1 border rounded text-gray-600 bg-gray-200"
        children={'First'}
        onClick={onlyFisrtPage}
      />
      <Button
        className="px-3 py-1 mx-1 border rounded text-gray-600 bg-gray-200"
        size={'small'}
        children={'Prev'}
        onClick={toPrevPage}
      />
      <span className="px-3 py-1 mx-1 border rounded text-gray-600 bg-white">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className="px-3 py-1 mx-1 border rounded text-gray-600 bg-gray-200"
        size={'small'}
        children={'Next'}
        onClick={toNextPage}
      />
      <Button
        className="px-4 py-1 mx-1 border rounded text-gray-600 bg-gray-200"
        children={'Last'}
        onClick={onlyLastPage}
      />
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(sampleTasks);

  const tasksPerPage = 14;

  const totalPages = Math.ceil(sampleTasks.length / tasksPerPage);

  const taskToDisplay = sampleTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleChangePage = (activePage) => {
    setCurrentPage(activePage);
  }

  const handleSearch = () => {
    const searchResults = sampleTasks.filter(task =>
      task.assignedTo.toLowerCase().includes(searchValue.toLowerCase()) ||
      task.comments.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTasks(searchResults);
  };

  return (
    <div className='box-border'>
      <div className='sticky top-0'>
        <Header />
      </div>
      <StripHeader taskCount={filteredTasks.length}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearch}
      />
      <TaskList taskToDisplay={taskToDisplay} />
      <div className='fixed bottom-0 p-3 border-2 w-full bg-slate-300 border-t'>
        <Pagination currentPage={currentPage} totalPages={totalPages} changePage={handleChangePage} />
      </div>
    </div>
  );
}

export default App;
