const randomStringGenerator = (len =100, str=true) => {
    let chars = "0123456789"
    if(str) {
        chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    

    let length = chars.length;
    let random = "";
    for(let i = 1; i <= len; i++) {
        let posn = Math.ceil(Math.random() * (length-1))
        random += chars[posn]
    }
    return random 
}

module.exports = {
    randomStringGenerator
}