const serverLink = "https://thesecondr.herokuapp.com";

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return "?" + keyValuePairs.join('&');
}

const get = (link,body)=>{
    return fetch(serverLink+link+objToQueryString(body))
    .then((res)=>{
        return JSON.parse(res._bodyText);
    });
};

const post = (link,body)=>{
    return fetch(serverLink+link,{
        method : 'POST',
        headers : {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
    })
    .then((res)=>{
        return JSON.parse(res._bodyText);
    });
}

export {get,post}
