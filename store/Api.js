import axios from'axios'



// const Api_Key="AIzaSyBFfe6jP_U4ANsmsQJm1BpAgBchzwzkRyg"
// const Base_URL="https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key="

export async function login(email,password){
    const response=await axios.post(Base_URL+loginUrl,{email:email,password:password})
    // console.log(response.data.success)
    return response
}

const BASE_URL='https://foodkart-react-default-rtdb.firebaseio.com/'
 export async function StoreExpense(expenseData){
    const response=await axios.post(BASE_URL+'foodItems.json',expenseData)
    return(response.data.name)
}

export async function FetchExpense(){
    const response=await axios.get(BASE_URL+'foodItems.json')
    const expenses=[]
    for(const key in response.data){
        const expenseObj={
            id:key,
            amount:response.data[key].amount,
            description:response.data[key].description,
            image:response.data[key].image,


        }
        expenses.push(expenseObj)
    }
    return expenses
}
export function UpdateItem(id,expenseData){
    return axios.put(BASE_URL+`foodItems/${id}.json`,expenseData)
}

export function DeleteItem(id){
    return axios.delete(BASE_URL+`foodItems/${id}.json`)

}



