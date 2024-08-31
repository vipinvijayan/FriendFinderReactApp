import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import Configuration from "../shared/Configuration";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
class ProfileMatch extends Component {

    constructor(props) {

        super(props);
        this.config = new Configuration();



        //this.handleSortChange = this.handleSortChange.bind(this);
        this.state = {
            loginKey: props.location.state,
            header: props.location.branchDetails,
            loading: false,
            authorized: true,
            items: [],


        }

    }

    componentDidMount() {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData === null || userData.accessToken === "") {
        this.props.history.push("/Login");
      }
      this.getProfileMatches();
    }

    render() {

        const items = this.state.items;
        //   const headerDetailsData = this.state.header;
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
              Matched Profiles
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

        let listItems = <div className="container page-todo bootstrap snippets bootdeys">
            <div className="col-sm-7 tasks">
                <div className="task-list">

                    <div className="task high">
                        <div className="desc">
                            <div className="title">No Data</div>

                        </div>

                    </div>




                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
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
                        <div>Match : {item.profileMatchPercentage} %</div>
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


                <div className="clearfix10"></div>

                <div className="items">

                    {listItems}
                </div>
                <PuffLoader color="#000" loading={this.state.loading} css={override} size={80} />

            </div>
        );

    }
    showUserDetails(item) {
      this.props.history.push({
        pathname: "/ProfileDetails",
        state: item.id,
        
      });
    }
    getProfileMatches() {
      const userData = JSON.parse(localStorage.getItem("userData"));
        this.setState({ loading: true });
        axios({
            method: "POST",
            url: this.config.GLOBAL_URL + 'user/getprofilesbymatchpercentage',
            data: {
              id: userData.id,
            },
            headers: { Authorization: `Bearer ${userData.accessToken}` },
        }).then(response => {


            if (response && response.status === 200 &&
                response.data && response.data.result === 'Success') {

                if (response.data.responseData) {
                    this.setState({
                        items: response.data.responseData,
                        loading: false
                    });
                }
            }

            else {
                this.setState({
                    items: [],
                    authorized: false,
                    loading: false,
                    noDataMessage: "Unauthorized login please try again"
                });
            }
        });
        this.setState({ loading: false });
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
            pathname: '/Login',
            state: ""
        });
    }

}

export default withRouter(connect()(ProfileMatch));