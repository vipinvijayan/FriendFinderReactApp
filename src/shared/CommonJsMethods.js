//import Configuration from "./Configuration";

class CommonJsMethods {
    constructor(props) {

        super(props);

    }
    GotoMenuPage = (loginKey, menuItem) => {
        alert(menuItem);
        alert(loginKey);
        var menuitems = "/" + menuItem;
        this.props.history.push({
            pathname: menuitems,
            state: loginKey
        });
    }

    // GotoUserSearch = (loginKey) => {
    //     this.props.history.push({
    //         pathname: '/UserSearch',
    //         state: loginKey
    //     });
    // }
    // GotoProfileMatch(loginKey) {
    //     this.props.history.push({
    //         pathname: '/ProfileMatch',
    //         state: loginKey
    //     });
    // }
    GotoLogout = () => {
        this.props.history.push({
            pathname: '/Login',
            state: ""
        });
    }
}
export default CommonJsMethods;
