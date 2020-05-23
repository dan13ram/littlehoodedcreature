import React, { useState } from "react";
import { Link } from "gatsby";
import logo from "../../static/img/om-logo.png";

const Navbar = ({ title }) => {
    const [open, toggleOpen] = useState(false);

    return (
        <nav className={open ? "navBar open" : "navBar"}>
            <Link to="/" className="navLogo" title={title}>
                <img src={logo} alt="" className="logoImg"/> {title}
            </Link>
            {/* <div className="navMenu" */}
            {/*     onClick= */}
            {/*     {() => { */}
            {/*         toggleOpen(open => !open); */}
            {/*     }}> */}
            {/*     <Link className="navItem" to={`/blog`}> */}
            {/*         blog */}
            {/*     </Link> */}
            {/*     <Link className="navItem" to={`/work`}> */}
            {/*         work */}
            {/*     </Link> */}
            {/*     <Link className="navItem" to={`/art`}> */}
            {/*         art */}
            {/*     </Link> */}
            {/*     <Link className="navItem" to={`/about`}> */}
            {/*         about */}
            {/*     </Link> */}
            {/*     <Link className="navItem" to="/contact"> */}
            {/*         contact */}
            {/*     </Link> */}
            {/*     <Link className="navItem" to="/contact/examples"> */}
            {/*         form examples */}
            {/*     </Link> */}
            {/* </div> */}
            {/* <div */}
            {/*     className="navToggle" */}
            {/*     onClick={() => { */}
            {/*         toggleOpen(open => !open); */}
            {/*     }} */}
            {/* > */}
            {/*     <div></div> */}
            {/* </div> */}
        </nav>
    );
};

export default Navbar;
