//import Configuration from "./Configuration";

class CommonJsMethods {
    constructor(props) {

        super(props);

    }
    GotoMenuPage = (loginKey, menuItem) => {
        alert(menuItem);
        alert(loginKey);
        var menuitems = "/friendsfinder/" + menuItem;
        this.props.history.push({
            pathname: menuitems,
            state: loginKey
        });
    }

    // GotoUserSearch = (loginKey) => {
    //     this.props.history.push({
    //         pathname: '/friendsfinder/UserSearch',
    //         state: loginKey
    //     });
    // }
    // GotoProfileMatch(loginKey) {
    //     this.props.history.push({
    //         pathname: '/friendsfinder/ProfileMatch',
    //         state: loginKey
    //     });
    // }
    GotoLogout = () => {
        this.props.history.push({
            pathname: '/friendsfinder/Login',
            state: ""
        });
    }
}
export default CommonJsMethods;
