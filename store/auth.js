import axios from "axios"
const Base_URL="http://nimish.timesole.com/"
const loginUrl="api/login"


// const Api_Key="AIzaSyBFfe6jP_U4ANsmsQJm1BpAgBchzwzkRyg"
// const Base_URL="https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key="

export async function login(email,password){
    const response=await axios.post(Base_URL+loginUrl,{email:email,password:password})
    console.log(response.data.success)
    return response
}

export async function getAddress(lat,lon){
    const url='https://geocode.maps.co/reverse?lat='+lat+'&lon='+lon
    const response= await fetch(url)
    if(!response.ok){
        throw new Error('Failed to fetch Address');
    }
    const data= await response.json()
    console.log(data.display_name)
    
    return (data.display_name)
}       