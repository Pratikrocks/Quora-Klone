import {isAuthenticated} from '../auth'
export const read = (userID,token) =>{
    console.log("**",userID)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`,{
        method:"GET",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(res=>{
        console.log(res)
        return res.json();
    })
    .catch(err=>{
        console.log(err)
    })
}
export const list = () =>{
    return fetch(`${process.env.REACT_APP_API_URL}/users`,{
        method:"GET",

    })
}
export const update = (userID,token,user) =>{
    console.log(user)
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`,{
        method:"PUT",
        headers: {
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        },
        body:user
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>console.log(err))
}
export const remove = (userID,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userID}`,{
        method:"DELETE",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
}
export const updateUser = (user,next) =>{
    if(typeof window!=undefined)
    {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem('jwt'))
            auth.user = user;
            localStorage.setItem('jwt',JSON.stringify(auth))
            next();
        }
    }
}

export const follow = (userID,token,followId) =>{
    // console.log(userID,followId)
    return fetch(`${process.env.REACT_APP_API_URL}/xx/follow/`,{
        method:"PUT",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",         
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userID , followId})
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const unfollow = (userID,token,unfollowId) =>{
    // console.log(userID,followId)
    return fetch(`${process.env.REACT_APP_API_URL}/xx/unfollow/`,{
        method:"PUT",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",         
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({userID , unfollowId})
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>console.log(err))
}
export const findPeople = (userID,token) =>{
    // console.log(userID,followId)
    return fetch(`${process.env.REACT_APP_API_URL}/yy/findpeople/${userID}`,{
        method:"GET",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",         
            Authorization:`Bearer ${token}`
        },
        
    })
    .then(response=>{
        // console.log(response)
        console.log(response)
        return response.json()
    })
    .catch(err=>console.log(err))
}