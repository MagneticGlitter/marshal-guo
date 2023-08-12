import {Link} from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import {useAuthContext} from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const {state: {user}}= useAuthContext();
    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className=''>Marshal Guo</h1>
                </Link>
                <nav>
                    { user && 
                        (<div>
                            <span>WELCOME: {user.email}</span>
                            {' '}
                            <button onClick={handleClick}>Log out</button>
                        </div>)
                    }
                    { !user &&
                        (<div>
                            Are you the owner of this website? 
                            <Link to="/Login">
                                Log In
                            </Link>
                            {/* <Link to="/signup">
                                Sign Up
                            </Link> */}
                        </div>)
                    }
                </nav>
            </div>
        </header>
    )
}

export default Navbar;