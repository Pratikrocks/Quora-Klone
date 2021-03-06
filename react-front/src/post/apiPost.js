export const create = (userID,token,post) =>{
    console.log(post)
    console.log(userID)
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userID}`,{
        method:"POST",
        headers: {
            Accept:"application/json",
            
            Authorization:`Bearer ${token}`
        },
        body: post
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const list = () =>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts`,{
        method:"GET",

    })
}


export const SinglePost = (postId) =>{
    console.log(postId)
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"GET",

    })
    .then(res =>{
        console.log(res)
        return res.json()
    })
    .catch(err => console.log(err))
}

export const update = (postID,token,post) =>{
    // console.log(post.get("title"))
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postID}`,{
        method:"PUT",
        headers: {
            Accept:"application/json",            
            Authorization:`Bearer ${token}`
        },
        body:post
    })
    .then(response=>{
        // console.log(response)
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const listByUser = (userID,token) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userID}`,{
        method:"GET",
        headers: {
            Accept:"application/json",
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },

    })
    .then(response => {
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const remove = (postID,token) =>{
    console.log("***************"+ postID)
    console.log("Going to be deleted")
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postID}`,{
        method:"DELETE",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getComments = (postID) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/comments/${postID}`, {
        method: "GET"
    })
    .then(response =>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const postComments = (commentBody, postID ,token) => {
    console.log(postID)
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postID}`, {
        method: "POST",
        headers: {
            Accept:"application/json",   
            "Content-Type":"application/json",         
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(commentBody)
    })
    .then(data=>{
        console.log(data);
        return data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const deleteComment = (commentId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response => {
        return response
    })
    .catch(err => {
        console.log(err)
    })
}