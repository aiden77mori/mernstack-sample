import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteArticle } from '../../actions/profileActions';

class MyArticle extends Component {
    onDeleteClick(id) {
        this.props.deleteArticle(id);
    }

    render() {
        const article = this.props.article.map(art => (
            <tr key={art._id}>
                <td>{art.title}</td>
                <td>{art.description}</td>
                <td>{art.like}</td>
                <td>{art.hate}</td>
                <td><Moment format="YYYY/MM/DD">{art.date}</Moment></td>
                <td><button onClick={this.onDeleteClick.bind(this, art._id)} className="btn btn-danger">Delete</button></td>      
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">My Article</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Like</th>
                            <th>Hate</th>
                            <th>Date</th>
                            <th />
                        </tr>
                        {article}
                    </thead>
                </table>
            </div>
        )
    }
}

MyArticle.propTypes = {
    deleteArticle: PropTypes.func.isRequired
}

export default connect(null, { deleteArticle })(MyArticle);