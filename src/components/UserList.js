import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../styles/common.css";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/bill.css";
import { connect } from "react-redux";

import axios from "axios";
import Configuration from "../shared/Configuration";
import { PuffLoader } from "react-spinners";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.config = new Configuration();
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

    //  var loginKey =props.location.state.loginKey;

    this.state = {
      userId: props.location.state,
      showDetails: false,
      editItem: false,
      noDataMessage: "Loading Data...",
      items: [],
      filteredItems: [],
      showLoader: true,
    };
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null || userData.accessToken === "") {
      this.props.history.push("/Login");
    }
    this.getItems();

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
  render() {
    const items = this.state.items;

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

        <div className="top-header container">
          <div className="clearfix"></div>

          <div className="clearfix10"></div>

          <div className="clearfix10"></div>
        </div>

        <div className="clearfix10"></div>

        <PuffLoader
          color="#000"
          loading={this.state.showLoader}
          css={override}
          size={80}
        />
        <div className="items">{listItems}</div>
      </div>
    );
  }

  getItems() {

    this.setState({ showLoader: true });

    const userData = JSON.parse(localStorage.getItem("userData"));
    axios({
      method: "POST",
      url: this.config.GLOBAL_URL + "user/getallothercompanyusers",
      data: {
        id: userData.id,
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
  showUserDetails(item) {
    this.props.history.push({
      pathname: "/friendsfinder/ProfileDetails",
      state: item.id,
      
    });
  }
 
  whatsappCustomer(item) {
    window.location.href =
      "https://wa.me/91" +
      item.BranchContact +
      "?text=Hi " +
      item.BranchName +
      " Greetings from Cliniqon";
  }

  handleSearchChange(event) {
    this.setState({ showLoader: true });
    const target = event.target;
    const evalue = target.value;
    var branchType = "";

    if (this.state.selectedTab === "All") {
      branchType = "";
    } else {
      branchType = this.state.selectedTab.toLowerCase();
    }

    if (evalue.length >= 3) {
      //items =

      const itemsWithFilter = this.state.allItems.filter((item) => {
        // 👇️ using AND (&&) operator
        return (
          item.Username.toLowerCase().includes(evalue.toLowerCase()) ||
          item.BranchName.toLowerCase().includes(evalue.toLowerCase()) ||
          item.Place.toLowerCase().includes(evalue.toLowerCase()) ||
          item.BranchContact.toLowerCase().includes(evalue.toLowerCase())
        );
      });

      this.setState({
        filteredItems: itemsWithFilter,
        items: itemsWithFilter,
        noOfAll: itemsWithFilter.length,
        noOfCompany: itemsWithFilter.filter(
          (item) => item.BranchType === "Company"
        ).length,
        noOfShops: itemsWithFilter.filter((item) => item.BranchType === "Shop")
          .length,
        showLoader: false,
      });
    } else {
      this.setState({ showLoader: false });
    }
    if (evalue === "") {
      const itemsWithFilter = this.state.allItems.filter((item) =>
        item.BranchType.toLowerCase().includes(branchType)
      );
      this.setState({
        filteredItems: itemsWithFilter,
        items: itemsWithFilter,
        noOfAll: itemsWithFilter.length,
        noOfCompany: itemsWithFilter.filter(
          (item) => item.BranchType === "Company"
        ).length,
        noOfShops: itemsWithFilter.filter((item) => item.BranchType === "Shop")
          .length,
        showLoader: false,
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({ amountToPay: value });
  }
  handleSortChange(event) {
    console.log(this.state.filteredItems);

    this.setState({ showLoader: true });
    const target = event.target;
    const value = target.value;

    var branchType = "";
    if (this.state.selectedTab === "All") {
      branchType = "";
    } else {
      branchType = this.state.selectedTab.toLowerCase();
    }

    if (value === "new") {
      this.setState({ sortOrder: "new" });
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType.toLowerCase().includes(branchType))
          .sort((a, b) => {
            return b.RegisteredOnUnix - a.RegisteredOnUnix;
          }),
        showLoader: false,
      });
    }
    if (value === "daily") {
      this.setState({ sortOrder: "daily" });
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType.toLowerCase().includes(branchType))
          .sort((a, b) => {
            return b.TodayOrderCount - a.TodayOrderCount;
          }),
        showLoader: false,
      });
    }
    if (value === "total") {
      this.setState({ sortOrder: "total" });
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType.toLowerCase().includes(branchType))
          .sort((a, b) => {
            return b.OrderCount - a.OrderCount;
          }),
        showLoader: false,
      });
    }
  }

  onSelect(itemLink) {
    this.clearState();
    this.itemService.getItem(itemLink).then((item) => {
      this.setState({
        showDetails: true,
        selectedItem: item,
      });
    });
  }

  onCancel() {
    this.clearState();
  }
  getAll() {
    this.setState({
      showLoader: false,
      sortBy: "Daily Count",
      selectedTab: "All",
      shopMenuClass: "nav-link",
      allMenuClass: "nav-link active",
      companyMenuClass: "nav-link",
    });

    if (this.state.sortOrder === "new") {
      this.setState({
        items: this.state.filteredItems.sort((a, b) => {
          return b.RegisteredOnUnix - a.RegisteredOnUnix;
        }),
        showLoader: false,
      });
    }
    if (this.state.sortOrder === "daily") {
      this.setState({
        items: this.state.filteredItems.sort((a, b) => {
          return b.TodayOrderCount - a.TodayOrderCount;
        }),
        showLoader: false,
      });
    }
    if (this.state.sortOrder === "total") {
      this.setState({
        items: this.state.filteredItems.sort((a, b) => {
          return b.OrderCount - a.OrderCount;
        }),
        showLoader: false,
      });
    }
  }
  getShops() {
    this.setState({
      showLoader: false,
      sortBy: "Daily Count",
      selectedTab: "Shop",
      shopMenuClass: "nav-link active",
      allMenuClass: "nav-link",
      companyMenuClass: "nav-link",
    });

    if (this.state.sortOrder === "new") {
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType === "Shop")
          .sort((a, b) => {
            return b.RegisteredOnUnix - a.RegisteredOnUnix;
          }),
        showLoader: false,
      });
    }
    if (this.state.sortOrder === "daily") {
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType === "Shop")
          .sort((a, b) => {
            return b.TodayOrderCount - a.TodayOrderCount;
          }),
        showLoader: false,
      });
    }
    if (this.state.sortOrder === "total") {
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType === "Shop")
          .sort((a, b) => {
            return b.OrderCount - a.OrderCount;
          }),
        showLoader: false,
      });
    }
  }

  getCompany() {
    this.setState({
      showLoader: false,
      sortBy: "Daily Count",
      selectedTab: "Company",
      shopMenuClass: "nav-link",
      allMenuClass: "nav-link",
      companyMenuClass: "nav-link active",
    });
    if (this.state.sortOrder === "new") {
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType === "Company")
          .sort((a, b) => {
            return b.RegisteredOnUnix - a.RegisteredOnUnix;
          }),
        showLoader: false,
      });
    }
    if (this.state.sortOrder === "daily") {
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType === "Company")
          .sort((a, b) => {
            return b.TodayOrderCount - a.TodayOrderCount;
          }),
        showLoader: false,
      });
    }
    if (this.state.sortOrder === "total") {
      this.setState({
        items: this.state.filteredItems
          .filter((item) => item.BranchType === "Company")
          .sort((a, b) => {
            return b.OrderCount - a.OrderCount;
          }),
        showLoader: false,
      });
    }
  }

  clearState() {
    this.setState({
      showDetails: false,
      selectedItem: null,
      editItem: false,
      newItem: null,
      showLoader: false,
    });
  }

  /* html content */
}
export default withRouter(connect()(UserList));
