function handleErr(error_code) {
    console.log(error_code);
    var error_message = "";
    switch(error_code){
        case 'auth/email-already-in-use':
            error_message = "The email provided is already in use";
            break;
        case 'auth/invalid-email':
            error_message = "The email provided is invalid";
            break;
        case 'auth/weak-password':
            error_message = "The password provided is not strong enough";
            break;
        case 'auth/user-disabled':
            error_message = "The user associated with this email has been disabled";
            break;
        case 'auth/user-not-found':
            error_message = "Email and password combination do not match";
            break;
        case 'auth/wrong-password':
            console.log(error_code);
            error_message = "Email and password combination do not match";
            break;
        default:
            break;
    }
    return error_message;
}

module.exports = {
    fire_err: handleErr
};