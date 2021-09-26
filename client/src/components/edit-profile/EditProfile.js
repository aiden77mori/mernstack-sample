import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // displaySocialInputs: false,
            handle: '',
            school: '',
            location: '',
            status: '',
            skills: '',
            errors: {}
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            // Bring skills array back to CSV
         const skillsCSV = profile.skills.join(',');

         // If profile field doesnt exist, make empty string
         profile.school = !isEmpty(profile.school) ? profile.school : "";
         profile.location = !isEmpty(profile.location) ? profile.location : "";

         // Set component fields state
         this.setState({
            handle: profile.handle,
            school: profile.school,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
         });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            school: this.state.school,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
         };
   
         this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    render() {
        // const { errors, displaySocialInputs } = this.state;
        const { errors } = this.state;

        // let socialInputs;
        
        // if(displaySocialInputs) {
        //     socialInputs = (
        //         <div>
        //            <InputGroup
        //               placeholder="Twitter Profile URL"
        //               name="twitter"
        //               icon="fa fa-twitter"
        //               value={this.state.twitter}
        //               onChange={this.onChange}
        //               error={errors.twitter}
        //            />
        //            <InputGroup
        //               placeholder="Facebook Page URL"
        //               name="facebook"
        //               icon="fa fa-facebook"
        //               value={this.state.facebook}
        //               onChange={this.onChange}
        //               error={errors.facebook}
        //            />
        //            <InputGroup
        //               placeholder="LinkedIn Profile URL"
        //               name="linkedin"
        //               icon="fa fa-linkedin"
        //               value={this.state.linkedin}
        //               onChange={this.onChange}
        //               error={errors.linkedin}
        //            />
        //            <InputGroup
        //               placeholder="Youtube Channel URL"
        //               name="youtube"
        //               icon="fa fa-youtube"
        //               value={this.state.youtube}
        //               onChange={this.onChange}
        //               error={errors.youtube}
        //            />
        //            <InputGroup
        //               placeholder="Instagram Page URL"
        //               name="instagram"
        //               icon="fa fa-instagram"
        //               value={this.state.instagram}
        //               onChange={this.onChange}
        //               error={errors.instagram}
        //            />
        //         </div>
        //      )
        // }

        // Select options for status
        const options = [
            {label: '* Select Professional Status', value: 0},
            {label: 'Developer', value: 'Developer'},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Manager', value: 'Manager'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Other', value: 'Other'}
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup 
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile URL. Your full name, company name, nickname"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={options}
                                    error={errors.status}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup 
                                    placeholder="School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                    error={errors.school}
                                    info="Could be your own company or one you work for"
                                />
                                <TextFieldGroup 
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info="City or city & state suggested (eg. Boston, MA)"
                                />
                                <TextFieldGroup 
                                    placeholder="* Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP"
                                />
                                {/* {socialInputs} */}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )    
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
 };
 
 const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
 });

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));