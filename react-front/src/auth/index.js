export const signUp = user =>{
    return fetch(`${process.env.REACT_APP_API_URL}/signup`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{

        return response.json()
    })
    .catch(err=>console.log(err))
}

export const signIn = user =>{
    console.log(user)
    return fetch(`${process.env.REACT_APP_API_URL}/signin`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{
        
        return response.json()
    })
    .catch(err=>console.log("HT"))
};

export const authenticate = (jwt, next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt" , JSON.stringify(jwt))
        next();
    }
    
};
export const signout = (next) =>{
    if(typeof window!="undefined")
    {
        localStorage.removeItem("jwt")
    }
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
        method:"GET"
    })
    .then((response)=>{
        console.log("Signout successful")
        return response.json()
    })

};

export const isAuthenticated = () =>{
    // console.log("jwt")
    if(typeof window==="undefined")
    {
        return false
    }
    if(localStorage.getItem("jwt"))
    {
        // console.log("jwt")
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else return false
}
