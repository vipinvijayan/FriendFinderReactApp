import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import '../styles/login.css';
import { connect } from "react-redux";
import { PuffLoader } from "react-spinners";
import axios from "axios";

import Configuration from "../shared/Configuration";
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.config = new Configuration();
        this.state = {
            userId: '',
            userName: '',
            keyData:"",
            resultData:"",
            isLoading: false,
            isError: false,
            errorMsg: ''
        }
    }


    componentDidMount() {
        this.setState({
            userId: "",
            userName: "",
            keyData:"",
            resultData:"",
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
            <h2 id="headerTitle">Gemini AI Test</h2>
            <div>
                <div className="row">
                    <label>What do you want to know ?</label>
                    <input type="text" value={this.state.keyData} onChange={(e) => this.setState({ keyData: e.target.value, isError: false })} placeholder="Start Asking" />
                </div>
              

                <div id="button" className="row">
                <PuffLoader color="#000" loading={this.state.isLoading} css={override} size={80} />
                    <button onClick={this.getGeminiResult} className="login">Show</button>
                    <div className="clearfix10"></div>
                 
                </div>
            </div>
          <div className="centerContent"><b> {this.state.resultData}</b></div> 
        </div>
        )
    }
    gotRegister=(e)=>
    {
        this.props.history.push({
            pathname: '/register',
           
        });
    }
   

    getGeminiResult = (e) => {
        this.setState({ isLoading: true });
        e.preventDefault();
        axios({
            method: "GET",
            url:  'https://bazaarnear.com/ecomapi/api/Products/getgeminiai?data='+this.state.keyData,
          
        }).then(response => {

            if (response && response.status === 200 &&
                response.data) {

                    this.setState({ resultData:response.data.candidates[0].content.parts[0].text});
                   this.setState({isLoading:false});
                   this.setState({keyData:""});
            }
            
            else {
               
            }
        })
            .catch(error => {

                this.setState({ error, isLoading: false, isFetchingDetails: false, errorMsg: 'Something went wrong, try after sometime.' })
            });
    }
}



export default withRouter(connect()(Login));