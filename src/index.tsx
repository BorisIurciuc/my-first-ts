import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import WeatherApi from './components/weatherApi/WeatherApi';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import { WeatherProvider } from './components/weatherContext/WeatherContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <WeatherProvider >
  <HashRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/weatherApi' element={<WeatherApi />} />
        <Route path="*" element={<h1>Error 404</h1>} />
      </Route>
    </Routes>
  </HashRouter>
  </WeatherProvider>
);