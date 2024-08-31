import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import '../styles/login.css';
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Configuration from "../shared/Configuration";
import { PuffLoader } from "react-spinners";
class Registration extends Component {
    
    constructor(props) {
        super(props);
        this.config = new Configuration();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            dateOfBirth:moment().format("YYYY-MM-DD"),
            designation:'',
            gender:'',
            profilePicture:'',
            country:'',
            favouriteColor:'',
            favouriteActor:'',
            isLoading: false,
            isError: false,
            errorMsg: ''
        }
    }


    componentDidMount() {
        this.setState({
            name: '',
            email: '',
            password: '',
            dateOfBirth:moment().format("YYYY-MM-DD"),
            designation:'',
            gender:'',
            profilePicture:'',
            country:'',
            favouriteColor:'',
            favouriteActor:'',
            isLoading: false,
            isError: false,
            errorMsg: ''
        });
    }

    /* html content */
    render() {
        const override = `
        display: block;
        margin: 0 auto;
        border-color: blue;
      `;
        return (
            <div id="registerform">
                <h2 id="headerTitle">Registration Form</h2>
                <div>
                    <div className="row">
                        <label>Name</label>
                        <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value, isError: false })} placeholder="Enter your name" />
                    </div>
                    <div className="row">
                        <label>Email(Username)</label>
                        <input type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value, isError: false })} placeholder="Enter your email" />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value, isError: false })} placeholder="Enter your password" />
                    </div>
                    <div className="row">
                        <label>DateOfBirth</label>
                        
                        <input defaultValue={this.state.dateOfBirth}
                name="dateOfBirth"
                placeholder="Date Of Birth"
                type="date"
                className="form-control searchBox"
                onChange={this.handleInputChange}/>
                       
                    </div>
                    <div className="row">
                        <label>Designation</label>
                        <input type="text" value={this.state.designation} onChange={(e) => this.setState({ designation: e.target.value, isError: false })} placeholder="Enter your designation" />
                    </div>
                    <div className="row">
                    <label>Gender</label>
              <select className="sortBranches" name="gender" onChange={this.handleInputChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
                     
                        
                    </div>
                    <div className="row">
                        <label>Country</label>
                        <input type="text" value={this.state.country} onChange={(e) => this.setState({ country: e.target.value, isError: false })} placeholder="Enter your country" />
                    </div>
                    <div className="row">
                        <label>FavoriteColor</label>
                        <input type="text" value={this.state.favouriteColor} onChange={(e) => this.setState({ favouriteColor: e.target.value, isError: false })} placeholder="Enter your favourite color" />
                    </div>
                    <div className="row">
                        <label>FavoriteActor</label>
                        <input type="text" value={this.state.favouriteActor} onChange={(e) => this.setState({ favouriteActor: e.target.value, isError: false })} placeholder="Enter your favourite actor" />
                    </div>
                  

                    <div id="button" className="row">
                    <PuffLoader color="#000" loading={this.state.isLoading} css={override} size={80} />
                        <button onClick={this.RegistrationUser} className="register">Register</button>
                        
                        <div className="clearfix10"></div>
                     <button className="login" onClick={this.gotLogin}>Login </button>
                    </div>
                </div>
                {/* <OtherMethods /> */}
            </div>
        )
    }
    gotLogin=(e)=>
        {
            this.props.history.push({
                pathname: '/login',
               
            });
        }
    RegistrationUser = (e) => {
     
        this.setState({ isLoading: true });
        e.preventDefault();
        axios({
            method: "POST",
            url:  this.config.GLOBAL_URL +'/user/registration',
            data: {
                name: this.state.name,
                username: this.state.email,
                email: this.state.email,
                password: this.state.password,
                dateOfBirth: this.state.dateOfBirth,
                designation: this.state.designation,
                profilePicture:'',
                gender: this.state.gender,
                country: this.state.country,
                favoriteColor: this.state.favouriteColor,
                favoriteActor: this.state.favouriteActor,
            }
        }).then(response => {


            if (response && response.status === 200 &&
                response.data && response.data.result === 'Success') {

                if (response.data.responseData) {
                    this.setState({
                        name: '',
                        email: '',
                        password: '',
                        dateOfBirth:moment().format("YYYY-MM-DD"),
                        designation:'',
                        gender:'',
                        profilePicture:'',
                        country:'',
                        favouriteColor:'',
                        favouriteActor:'',
                        isLoading: false,
                        isError: false,
                        errorMsg: ''
                    });

                    localStorage.setItem('userData',JSON.stringify(response.data.responseData));
                    this.setState({ showLoader: false });
                    this.props.history.push({
                        pathname: '/UserList',
                        state: response.data.responseData.id
                    });
                }
            }
            else {
                confirmAlert({
                    title: 'Login Failed',
                    message: 'Username or password invalid',
                    buttons: [
                        {
                            label: 'Ok',
                        }
                    ]
                });
            }
        })
            .catch(error => {

                this.setState({ error, isLoading: false, isFetchingDetails: false, errorMsg: 'Something went wrong, try after sometime.' })
            });
    }
    handleInputChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value,
        });
      }
}





export default withRouter(connect()(Registration));