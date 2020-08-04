class Auth {
    constructor() {
        this.authenticated = false;
        this.username = '';
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        this.username = '';
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    setUserDetails(name) {
        this.username = name;
    }

    getUserDetails() {
        return this.username;
    }
}

export default new Auth();