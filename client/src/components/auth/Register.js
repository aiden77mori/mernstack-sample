import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="Register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-5 text-center">Sign Up</h1>
                            <form noValidate onSubmit={ this.onSubmit }>
                                <TextFieldGroup 
                                    placeholder="name"
                                    value={ this.state.name }
                                    name="name"
                                    onChange= { this.onChange }
                                    error= { errors.name }
                                />
                                <TextFieldGroup 
                                    type="email"
                                    placeholder="email"
                                    value={ this.state.email }
                                    name="email"
                                    onChange= { this.onChange }
                                    error= { errors.email }
                                    info="This site uses Gravatar so if you want a profile image, user a Gravatar email"
                                />
                                <TextFieldGroup 
                                    type="password"
                                    placeholder="password"
                                    value={ this.state.password }
                                    name="password"
                                    onChange= { this.onChange }
                                    error= { errors.password }
                                />
                                <TextFieldGroup 
                                    type="password"
                                    placeholder="confirm password"
                                    value={ this.state.password2 }
                                    name="password2"
                                    onChange= { this.onChange }
                                    error= { errors.password2 }
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" value="OK" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));