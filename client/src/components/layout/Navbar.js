import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    state = {
        collapseID: ''
      };

    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="navbar-item mr-3">
                    <Link className="nav-link" to="/profiles">Developers</Link>
                </li>
                <li className="nav-item">
                    <a href="#" onClick={this.onLogoutClick.bind(this)} className="nav-link">
                        <img
                            className="rounded-circle"
                            src={'../../../img/' + user.name + '.jpg'} alt={user.name} style={{ width: '25px', border: '1px solid grey'}} title="user's avatar." />
                            {' '}
                            Log Out
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            < ul className="navbar-nav ml-auto" >
                <li className="navbar-item mr-3">
                    <Link className="nav-link" to="/profiles">Developers</Link>
                </li>
               <li className="nav-item">
                <Link className="nav-link" to="/register">
                    Sign Up
                </Link>
               </li>
               <li className="nav-item">
                <Link className="nav-link" to="/">
                    Log In
                </Link>
               </li>
            </ul >
         );

        return (
            <nav className="navbar-dark info-color navbar navbar-expand-md">
                <div className="container">
                    <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
                    <button className="navbar-toggler" type="button" data-toggler="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>   

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>  
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);