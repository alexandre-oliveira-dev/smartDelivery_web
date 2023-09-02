import { BrowserRouter } from 'react-router-dom';
import RouterApp from './services/router';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <RouterApp></RouterApp>
      </BrowserRouter>
    </div>
  );
}
export default App;
