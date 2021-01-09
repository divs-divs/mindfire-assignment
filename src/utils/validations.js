export default {
    required: 'required',
    requiredAlpha: 'required|alpha_space',
    phone: 'required',
    requiredPincode: 'required|min:6|max:6',
    requiredEmail: 'required|email',
    requiredMin: 'required|numeric|min:1,num',

    validate (validatior) {
        if (validatior.allValid()) {
            return true
        } else {
            validatior.showMessages()
        }
    },
    capitalizeText(value) {
        let str = value.split(" ");
        for (let i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        return str.join(" ");
        
    }
}