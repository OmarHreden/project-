import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Verifi from './verifiction';
import Ver2 from './Vierfi';
import Dash from './Dashpord';
import User from './Dashpord_page/User';
import DashHome from './Dashpord_page/HomeDashpord';
import "./Style/dashpordStyle.css"
import Admain from './Dashpord_page/AdmainDash'
import AdmainRegester from './Dashpord_page/AdmainRegester'
import {BrowserRouter} from 'react-router-dom'
import './Style/Style-vierfi.css';
import Hotel from "./Dashpord_page/AddHotel";
import { ThemeProvider } from "./ThemeContext";
import ShowHotel from './Dashpord_page/Hotel';
export default function App(){
 return(
 
    

   
  <ThemeProvider>
          <Routes>
            {/* <Route path='/verifi' element={<Verifi/>}></Route> */}
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/verifi" element={<Ver2></Ver2>}></Route>
            <Route path="/dish" element={<Dash></Dash>}>
          <Route path="user" element={<User></User>}></Route>
          <Route path="home" element={<DashHome></DashHome>}></Route>
          <Route path="admain" element={<Admain></Admain>}></Route>
          <Route path="Add-Admain" element={<AdmainRegester></AdmainRegester>}></Route>
          <Route path="Add-Hotel" element={<Hotel></Hotel>}></Route>
          <Route path="Show-Hotel" element={<ShowHotel></ShowHotel>}></Route>

        </Route>
          </Routes>
          </ThemeProvider>

 );
}