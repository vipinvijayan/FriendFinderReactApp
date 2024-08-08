import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../styles/common.css";

import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { PuffLoader } from "react-spinners";

import { connect } from "react-redux";

import axios from "axios";
import Configuration from "../shared/Configuration";

class BillGeneration extends Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckBoxChange=this.handleCheckBoxChange.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.state = {
      gender: "male",
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      dateChecked: false,
      loading: false,
      keyword:"",
      items: [],
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null || userData.accessToken === "") {
      this.props.history.push("/Login");
    }
    this.getItems();
  }

  render() {
    const items = this.state.items;
    const override = `
        display: block;
        margin: 0 auto;
        border-color: blue;
      `;
    // eslint-disable-next-line
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
              Cliniqon User List
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
                  Search Profile
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
                    this.GotoFriendsList();
                  }}
                >
                  Friends List
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
    let listItems = (
      <div className="page-todo bootstrap snippets bootdeys">
        <div className="col-sm-7 tasks">
          <div className="task-list">
            <div className="task high">
              <div className="desc">
                <div className="title">{this.state.noDataMessage}</div>
              </div>
            </div>

            <div className="clearfix10"></div>
          </div>
        </div>
      </div>
    );

    if (items.length > 0) {
      listItems = items.map((item, key) => {
        return (
          <div className="page-todo bootstrap snippets bootdeys" key={key}>
            <div className="col-sm-7 tasks">
              <div className="task-list">
                <div className="task medium">
                  <div className="desc">
                    <div className="profilePic">
                      <img src={item.profilePicture} alt="Profile Pic" />
                    </div>
                    <div className="mainCnt">
                      <div className="title">{item.name}</div>
                      {/* <div>{item.profilePicture}</div> */}
                      <div>Designation : {item.designation}</div>
                    </div>
                  </div>
                  <div className="desc">
                    <button
                      className="btn btn-green-gradiant"
                      onClick={() => this.showUserDetails(item)}
                    >
                      Details
                    </button>
                  </div>
                </div>

                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="App">
        {menubar}
        {/* <div className="topBar"> Cliniqon Usage Details </div>
                <div className="back"></div> */}
        <div className="top-header container">
          <div className="clearfix"></div>

          <div className="clearfix10"></div>
          <div className="d-flex flex-column align-content-between">
            <div className="d-flex flex-column col-12">
            <label>
                <input
                 name="dateChecked"
                    type="checkbox"
                   className="dateOfBirthCheckBox"
                    onChange={this.handleCheckBoxChange}
                />
             <span> Search By Date Of Birth Between  </span>
            </label>
             

              <input
                value={this.state.fromDate}
                name="fromDate"
                placeholder="From Date"
                type="date"
                className="form-control searchBox"
                onChange={this.handleInputChange}
              />
              <div className="clearfix10"></div>
              <input
                value={this.state.toDate}
                name="toDate"
                placeholder="To Date"
                type="date"
                className="form-control searchBox"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="clearfix10"></div>
            <div className="d-flex flex-column col-12">
              <input
                defaultValue={this.state.keyword}
                name="keyword"
                placeholder="Name/Favourite Color/Favourite Actor"
                type="text"
                className="form-control searchBox"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="clearfix10"></div>
            <div className="d-flex flex-column col-12">
              <label>Gender</label>
              <select
                className="sortBranches"
                name="gender"
                onChange={this.handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="clearfix10"></div>
            {}
            <div className="clearfix10"></div>
            <div className="d-flex flex-column col-10 searchBox">
              <button
                className="btn btn-primary"
                onClick={() => this.getItems()}
              >
                Search User
              </button>
            </div>
          </div>
          <div className="clearfix10"></div>
        </div>

        <div className="clearfix10"></div>

        <div className="items">{listItems}</div>
        <PuffLoader
          color="#000"
          loading={this.state.loading}
          css={override}
          size={80}
        />
      </div>
    );
  }


  GotoUserList() {
    this.props.history.push({
      pathname: "/friendsfinder/UserList",
    });
  }

  GotoSearchPage() {
    this.props.history.push({
      pathname: "/friendsfinder/UserSearch",
    });
  }
  GotoProfileMatches() {
    this.props.history.push({
      pathname: "/friendsfinder/ProfileMatch",
    });
  }
  GotoFriendsList() {
    this.props.history.push({
      pathname: "/friendsfinder/FriendsList",
    });
  }
  GotoLogout() {
    localStorage.removeItem("userData");
    this.props.history.push({
      pathname: "/friendsfinder/Login",
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
  showPassword() {
    if (this.state.isPasswordType === "password") {
      this.setState({ isPasswordType: "text" });
    } else {
      this.setState({ isPasswordType: "password" });
    }
  }

  handleInputChange(event) {
  
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleCheckBoxChange(event) {
 
    const target = event.target;
    const value = target.checked;
 //   this.state.dateChecked= value;
    this.setState({ dateChecked: true });
  }

  getItems() {
    this.setState({ showLoader: true });

   debugger;
    
    const userData = JSON.parse(localStorage.getItem("userData"));
    axios({
      method: "POST",
      url: this.config.GLOBAL_URL + "user/getallcompanyfriends",
      data: {
        requestBy: userData.id,
        takeAll: true,
        skip: 0,
        take: 0,
        isDateChecked: this.state.dateChecked,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        keyword: this.state.keyword,
        gender: this.state.gender,
      },
      headers: { Authorization: `Bearer ${userData.accessToken}` },
    })
      .then((response) => {
        if (
          response &&
          response.status === 200 &&
          response.data &&
          response.data.result === "Success"
        ) {
          if (
            response.data.responseData &&
            response.data.responseData.length > 0
          ) {
            this.setState({
              showLoader: false,
              filteredItems: response.data.responseData,
              items: response.data.responseData,
            });
          }
        }
      })
      .catch((error) => {
        this.setState({
          error,
          isLoading: false,
          isFetchingDetails: false,
          errorMsg: "Something went wrong, try after sometime.",
        });
      });
  }

  onCancel() {
    this.clearState();
  }

  clearState() {
    this.setState({
      fromDate: new Date(),
      toDate: new Date(),
      secretKey: "",
    });
  }
}
export default withRouter(connect()(BillGeneration));
