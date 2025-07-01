import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash,faHome    } from '@fortawesome/free-solid-svg-icons';
import { FaHotel , FaPlane , FaUserShield , FaUser  } from 'react-icons/fa';
export default function SideBar(){
return(

    <div className="sid-bar">

       
       
        <Link to="home" className="link-sid">   <FontAwesomeIcon icon={faHome} className="" /> Home
        {/* <div className="oo">add</div> */}
        </Link>
        <Link to="user" className="link-sid"> <FaUser /> User
        {/* <div className="oo">add</div> */}
        </Link>

        <Link to="admain" className="link-sid"> <FaUserShield></FaUserShield> Admain 
            <div className="oo">
                    <Link className="oo" to="Add-Admain">create</Link>
            </div>
        </Link>
        

        <Link to="user" className="link-sid"> <FaHotel></FaHotel> Hotel
            <div className="oo">
                    <Link className="oo" to="Add-Hotel">add</Link>
            </div>
        </Link>

        <Link to="user" className="link-sid"><FaPlane></FaPlane> Airline
            <div className="oo">add</div>
        </Link>
    </div>
);
}