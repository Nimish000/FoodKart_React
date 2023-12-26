import { createContext,useReducer } from "react";

export const Context=createContext({
    items:[],
    addItem:({description,amount,image})=>{},
    setItem:({})=>{},
    deleteItem:({id})=>{},
    updateItem:(id,{description,amount,image})=>{},

})

function contextReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [action.payload,...state]
        case 'SET':
            const inverted=action.payload.reverse()
            return inverted
        case 'UPDATE':
            const updateableItemIndex=state.findIndex(
                (item)=>item.id===action.payload.id
            )
            const updatableItemData=state[updateableItemIndex]
            const updatedItem={...updatableItemData,...action.payload.data}
            const updatedItemData=[...state]
            updatedItemData[updateableItemIndex]=updatedItem
            
            return updatedItemData
        case 'DELETE':
            return state.filter((expense)=>expense.id !==action.payload)
            default:
                return state
    }
    
}

function ContextProvider({children}){
    const[itemState,dispatch]=useReducer(contextReducer,[])
    function addItem(itemData){
        dispatch({type:'ADD',payload:itemData})
        
    }
    function setItem(item){
        dispatch({type:'SET',payload:item})

    }
    function deleteItem(id){
        dispatch({type:'DELETE',payload:id})

    }
    function updateItem(id,itemData){
        dispatch({type:'UPDATE',payload:{id:id,data:itemData}})

    }
    const value={
        items:itemState,
        addItem:addItem,
        setItem:setItem,
        deleteItem:deleteItem,
        updateItem:updateItem
    }
    return <Context.Provider value={value}>{children}</Context.Provider>

}
export default ContextProvider