import { useState } from 'react';
import logo from '../src/img/SCPLogo.png';

function Nav()
{
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) =>
    {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) =>
    {
        event.preventDefault();
        const element = document.getElementById(searchTerm.toUpperCase());
        if (element)
        {
            element.scrollIntoView({ behavior: 'smooth' });
        } else
        {
            alert('SCP not found');
        }
    };

    return (
        <nav id="nav" className="navbar bg-transparent">
            <div className="container-fluid">
                <a className="navbar-brand text-light ms-2 fs-3">
                    <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-text-top" />
                    SCP Database
                </a>
                <p className="fs-6 mt-3 text-warning">Secure, Contain, Protect.</p>
                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="btn btn-outline-danger" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}

export default Nav;
