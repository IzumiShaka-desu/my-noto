import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <HomePage />
        </div>
      ),
    },]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
