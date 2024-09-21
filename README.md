# To-Do List Application

## Project Setup

**Initialize the React project**
- Installed & configuring Tailwind CSS and react-icons setup.


## State Management
- React Hooks: 
  - `useState`: Used to manage search value, task list, current page of the code.
  - State is updated dynamically as tasks are added, searched, or modified.

## Features 
### Header
- Header with:
  - Logo
  - Title ("Tasks")
  - Action buttons (New Task and Refresh)
- Responsive design using Tailwind CSS

### StripHeader
- This Header is for serch functionalites, no of record counts
  - taskCount
  - searchbar (searchValue) - allow serching users and commets also, disply pilterd tasks.

### TaskList
- Displays table of tasks having:
  - Checkbox to select the tasks
  - Columns for -
    - Assigned To
    - Status
    - Due Date
    - Priority
    - Comments
  - Edit and Delete (accessible via a dropdown in the action column).
- Rows ware clickable, and hovering highlights rows for a better user experience.
- Responsive table layout with horizontal scroll for smaller screen sizes.

### Pagination
- Pagination controls for navigating through multiple task pages.
  - First/Last buttons to navigate to the beginning or end of the task list.
  - Prev/Next buttons for navigating between adjacent pages.
  - Displays the current page and total number of pages.

### JSON Server Integration
- Installed JSON Server as a development dependency.
- Added a Script to run the server - `npm run json-server`

