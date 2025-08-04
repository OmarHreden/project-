import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
export default function TopBar(){

    return(
        <div className="top-bar">
            <h1>SkyNest</h1>
            {/* <ThemeToggle></ThemeToggle> */}
            <Link to="/register"  onClick={window.localStorage.removeItem('emil')} className="link-tobBar"> logOut</Link>
            
        </div>
    );
}