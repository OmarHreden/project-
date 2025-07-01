import Top from './Components/TopBar' 
import Sid from './Components/SidBar' 
import User from './Dashpord_page/User'
import { Outlet } from 'react-router-dom';
export default function Dashpord(){
    return(
        <div>
            <Top></Top>
            <div className='contener-dish'>
            <Sid></Sid>
            <Outlet className="outlete"/>
            </div>
        
        </div>
    );
}