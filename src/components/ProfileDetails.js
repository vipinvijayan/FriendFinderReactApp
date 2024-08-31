import axios from "axios";
import React, { Component } from "react";
import "../styles/common.css";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Configuration from "../shared/Configuration";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.handleInputChange = this.handleInputChange.bind(this);

    //this.handleSortChange = this.handleSortChange.bind(this);
    this.state = {
      selectedUserId: props.location.state,
      loading: false,
      showSaveButton:true
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null || userData.accessToken === "") {
      this.props.history.push("/Login");
    }
    this.getSelectedUserDetails();
  }

  render() {

    const headerDetailsData = this.state.userDetails;
    const override = `
        display: block;
        margin: 0 auto;
        border-color: blue;
      `;
      const menubar = (
        <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header page-scroll">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-ex1-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              {/* eslint-disable-next-line*/}
              <a className="navbar-brand page-scroll" href="#page-top">
                User Profile Details
              </a>
            </div>
  
            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="hidden">
                  {/* eslint-disable-next-line*/}
                  <a className="page-scroll" href="#page-top"></a>
                </li>
                <li>
                  <button
                    type="submit"
                    className="page-scroll"
                    onClick={() => {
                      this.GotoUserList();
                    }}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="submit"
                    className="page-scroll"
                    onClick={() => {
                      this.GotoSearchPage();
                    }}
                  >
                    Find Friend
                  </button>
                </li>
                <li>
                  <button
                    type="submit"
                    className="page-scroll"
                    onClick={() => {
                      this.GotoProfileMatches();
                    }}
                  >
                    Profile Matches
                  </button>
                </li>
               
                <li>
                  <button
                    type="submit"
                    className="page-scroll"
                    onClick={() => {
                      this.GotoLogout();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    let headerDetails = [];
    if (headerDetailsData != null)
      headerDetails = (
        <div>
          <div className="row fontCustom">
            <div className="col billContainer">
              <div className="billAddressHeader">
              <img src={headerDetailsData.profilePicture} alt="Profile Pic" />
                <div className="col font18 fontWeight600 billBranchName">
                  {headerDetailsData.name}({headerDetailsData.designation})
                </div>
                <div className="col font10 fontWeight500 ">
                 
                 Email :<b>   {headerDetailsData.email}</b>
                 
                </div>
                <div className="col font10 fontWeight500 ">
                 
                 DOB :<b>  {moment.unix(headerDetailsData.dateOfBirth).format('DD/MMM/yyyy')} </b>
                 
                </div>
                <div className="col font10 fontWeight500 ">
                 Country :<b> {headerDetailsData.country ? headerDetailsData.country : ""}{" "}</b>
                </div>
                <div className="col font10 fontWeight500 ">
                FavoriteColor : <b>{headerDetailsData.favoriteColor}</b> 
                </div>
                <div className="col font10 fontWeight500 ">FavoriteActor :{" "}
                <b>  {headerDetailsData.favoriteActor}</b></div>
                <div className="col font10 fontWeight500 ">
                Registered On : <b>{moment.unix(headerDetailsData.registeredOn).format('DD/MMM/yyyy')} </b>
                </div>
             
             
              </div>
              <div className="clearfix10"></div>
              <button  className="btn btn-green-gradiant" onClick={() => this.addasfriend(headerDetailsData)} >
                                Add Friend
                              </button>
            </div>
          </div>
       
        </div>
      );
    else headerDetails = <div className="row fontCustom billContent"></div>;
  
  

    return (
      <div className="App">
        {menubar}
        {/* <div className="topBar"> Cliniqon Usage Details </div>
                <div className="back"></div> */}

        {headerDetails}
        <div className="clearfix10"></div>

    
        <PuffLoader
          color="#000"
          loading={this.state.loading}
          css={override}
          size={80}
        />
      
      
  
      </div>
    );
  }

  getSelectedUserDetails() {
    this.setState({ loading: true });
    const userData = JSON.parse(localStorage.getItem("userData"));
    axios({
      method: "POST",
      url:
        this.config.GLOBAL_URL +
        "user/getuserdetails",
      data: {
        id: this.state.selectedUserId,
        
      },
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    }).then((response) => {
   
      if (
        response &&
        response.status === 200 &&
        response.data &&
        response.data.result === "Success"
      ) {
        if (response.data.responseData) {
          
          this.setState({
            userDetails: response.data.responseData,
            loading: false,
          });
        }
      } else {
        this.setState({
          items: [],
          authorized: false,
          loading: false,
          noDataMessage: "Unauthorized login please try again",
        });
      }
    });
    this.setState({ loading: false });
  }
  addasfriend (item)  {

const userData = JSON.parse(localStorage.getItem("userData"));
    axios({
        method: "POST",
        url:  this.config.GLOBAL_URL +'/user/savecompanyfriendsdata',
        data: {
          userId: userData.id,
          friendId: item.id,
          createdBy:userData.id
        },
        headers: { Authorization: `Bearer ${userData.accessToken}` },
    }).then(response => {

        if (response && response.status === 200 &&
            response.data && response.data.result === 'Success') {

            if (response.data.responseData) {
                
              confirmAlert({
                title: 'Success',
                message: 'Successfully Saved',
                buttons: [
                    {
                        label: 'Ok',
                    }
                ]
            });
          
              

              
            }
        }
        else {
            confirmAlert({
                title: 'Failed',
                message: 'Saving Failed',
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

  GotoUserList() {
    this.props.history.push({
      pathname: "/UserList",
      
    });
  }

  GotoSearchPage() {
    this.props.history.push({
      pathname: "/UserSearch",
      
    });
  }
  GotoProfileMatches() {
    this.props.history.push({
      pathname: "/ProfileMatch",
      
    });
  }
  GotoFriendsList() {
    this.props.history.push({
      pathname: "/FriendsList",
      
    });
  }
  GotoLogout() {
    localStorage.removeItem("userData");
    this.props.history.push({
      pathname: "/Login",
      state: "",
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(
      this.state.detailBillMessage,
      "Copy this text to clipboard"
    );
    alert("Bill Copied");
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

export default withRouter(connect()(ProfileDetails));
