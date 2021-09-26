import React from 'react'
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div>
            <div className="btn-group mb-4" role="group">
                <Link to="/edit-profile" className="btn btn-light">
                    <i className="fa fa-user text-info mr-1" />
                    Edit Profile
                </Link>
                <Link to="/add-article" className="btn btn-light">
                    <i className="fa fa-black-tie text-info mr-1" />
                    Add Article
                </Link>
            </div>
        </div>
    )
};

export default ProfileActions;