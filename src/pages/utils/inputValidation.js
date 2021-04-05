// only letter, number and underline.
const usernameRegex = /(\w){4,12}/;
// must contain at least one uppercase letter, one lowercase letter, and one number, no special character.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w]{8,}$/;

function matchExact(r, str) {
    const match = str.match(r);
    return match && str === match[0];
}

const usernameValid = (str) => {
    if(!str){
        return false;
    }

    return matchExact(usernameRegex, str);
}

const passwordValid = (str) => {
    if(!str){
        return false;
    }

    return matchExact(passwordRegex, str);
}

export { usernameValid, passwordValid };