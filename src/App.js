import './App.css';
import Home from './Home'
import { AppProvider } from './Context';

const App = () => {
  return (
    <>
    <AppProvider>
      <Home/>
    </AppProvider>
    </>
  );
};

export default App;
