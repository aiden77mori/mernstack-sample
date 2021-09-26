import React, { Component } from 'react';
import Moment from "react-moment";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { incArcNum, decArcNum } from '../../actions/profileActions';

class ProfileArticle extends Component {
    onIncNum(id, handle) {
        this.props.incArcNum(id, handle);
    }

    onDecNum(id, handle) {
        this.props.decArcNum(id, handle);
    }

    render() {
        const { profile, authID } = this.props;

        const artItems = profile.article.map(art => (
         <li key={art._id} className="list-group-item">
            <p>
                <strong>Title: </strong>{art.title}
            </p>
            <p>
                <strong>Date: </strong><Moment format="YYYY/MM/DD">{art.date}</Moment>
            </p>
            <p>
                <strong>Like: </strong>{art.like}
            </p>
            <p>
                <strong>Hate: </strong>{art.hate}
            </p>
            <p>
                <strong>Description: </strong>{art.description}
            </p>
            { authID !== profile.user._id ? (
                <button className="btn btn-danger float-left" onClick={this.onDecNum.bind(this, art._id, profile.handle)}>Hate</button>
            ) : null }
            { authID !== profile.user._id ? (
                <button className="btn btn-info float-right" onClick={this.onIncNum.bind(this, art._id, profile.handle)}>Like</button>
            ) : null }
         </li>
      ));

        return (
            <div className="row">
            <div className="col-md-12">
               <h3 className="text-center text-info">Article</h3>
                {artItems.length > 0 ? (
                    <ul className="list-group">{artItems}</ul>
                ) : (
                     <p className="text-center">No Article Listed</p>
                    )}
            </div>
         </div>
        );
    }
}

ProfileArticle.propTypes = {
    incArcNum: PropTypes.func.isRequired,
    decArcNum: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    authID: PropTypes.string.isRequired
}

export default connect(null, { incArcNum, decArcNum })(ProfileArticle);