import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import '../styles/login.css';
import { connect } from "react-redux";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import Configuration from "../shared/Configuration";
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.config = new Configuration();
        this.state = {
            userId: '',
            userName: '',
          
            isLoading: false,
            isError: false,
            errorMsg: ''
        }
    }


    componentDidMount() {
        this.setState({
            userId: "",
            userName: "",
           
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
            <div id="loginform">
                <h2 id="headerTitle">Login</h2>
                <div>
                    <div className="row">
                        <label>Username</label>
                        <input type="text" value={this.state.userName} onChange={(e) => this.setState({ userName: e.target.value, isError: false })} placeholder="Enter your username" />
                    </div>
                    <div className="row">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value, isError: false })} placeholder="Enter your password" />
                    </div>

                    <div id="button" className="row">
                    <PuffLoader color="#000" loading={this.state.isLoading} css={override} size={80} />
                        <button onClick={this.loginUser} className="login">Login</button>
                        <div className="clearfix10"></div>
                     <button className="register" onClick={this.gotRegister}>Register </button>
                    </div>
                </div>
                {/* <OtherMethods /> */}
            </div>
        )
    }
    gotRegister=(e)=>
    {
        this.props.history.push({
            pathname: '/friendsfinder/register',
           
        });
    }
    loginUser = (e) => {
        this.setState({ isLoading: true });
        e.preventDefault();
        axios({
            method: "POST",
            url:  this.config.GLOBAL_URL +'/user/login',
            data: {
                "username": this.state.userName,
                "password": this.state.password
            }
        }).then(response => {

            if (response && response.status === 200 &&
                response.data && response.data.result === 'Success') {

                if (response.data.responseData) {
                    this.setState({
                        userId: response.data.responseData.id,
                        userName: response.data.responseData.email,
                        isLoading: false,
                        isError: false,
                        errorMsg: ''
                    });
                    
                    localStorage.setItem('userData',JSON.stringify(response.data.responseData));
                  
                    
                    this.props.history.push({
                        pathname: '/friendsfinder/UserList',
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
}

// const FormHeader = props => (
//     <h2 id="headerTitle">{props.title}</h2>
// );


// const Form = props => (
//     <div>
//         <FormInput description="Username" value={props.userName} placeholder="Enter your username" type="text" />
//         <FormInput description="Password" value={props.password} placeholder="Enter your password" type="password" />
//         <FormButton onClick={this.loginUser} title="Log in" />
//     </div>
// );

// const FormButton = props => (
//     <div id="button" className="row">
//         <button onClick={props.onClick}>{props.title}</button>
//     </div>
// );

// const FormInput = props => (
//     <div className="row">
//         <label>{props.description}</label>
//         <input type={props.type} value={props.value} placeholder={props.placeholder} />
//     </div>
// );

// const OtherMethods = props => (
//     <div id="alternativeLogin">
//         <label>Or sign in with:</label>
//         <div id="iconGroup">
//             <Facebook />
//             <Twitter />
//             <Google />
//         </div>
//     </div>
// );

// const Facebook = props => (
//     <a href="#" id="facebookIcon"></a>
// );

// const Twitter = props => (
//     <a href="#" id="twitterIcon"></a>
// );

// const Google = props => (
//     <a href="#" id="googleIcon"></a>
// );



export default withRouter(connect()(Login));