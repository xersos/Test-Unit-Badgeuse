const LIST = [];
let index = 0;

exports.addToken = (token) => {
    LIST.push(token);

    setTimeout(() => {
        LIST.splice(LIST.indexOf(token), 1);
    },10800000); // after 3h
};

exports.checkToken = (tokenClient) => {
    index ++;
    return LIST.indexOf(tokenClient) >= 0;

};

exports.delToken = (token) => {
    LIST.splice(LIST.indexOf(token), 1);
};