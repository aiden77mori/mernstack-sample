import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="Login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-5 text-center">
                                <span data-test="badge" className="badge green badge-green mr-2 mt-2"><i data-test="fa" className="fa fa-user"></i></span>
                                Log In
                            </h1>
                            <form onSubmit={ this.onSubmit }>
                                <TextFieldGroup 
                                    placeholder="name"
                                    value={ this.state.name }
                                    name="name"
                                    onChange= { this.onChange }
                                    error= { errors.name }
                                />
                                <TextFieldGroup 
                                    type="password"
                                    placeholder="password"
                                    value={ this.state.password }
                                    name="password"
                                    onChange= { this.onChange }
                                    error= { errors.password }
                                />
                                <input type="submit" className="col-md-12 btn btn-info" value="Verify" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,   
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);