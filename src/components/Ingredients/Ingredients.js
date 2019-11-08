import React,{useState, useEffect, useCallback,useReducer} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentState, action) =>{
  console.log(currentState)
  switch(action.type){
      case 'SET':
        return action.ingredients;
      case 'ADD':
        return [...currentState,action.ingredients];
      case 'DELETE':
        return currentState.filter(ing => ing.id !==action.id)
      default :
        throw new Error("Something wrong");
  }
}

const Ingredients = React.memo(props =>{
  const [userIngrdients, dispatch] = useReducer(ingredientReducer,[])
  // console.log(userIngrdients)
  // const [userIngrdients, setUserIngrdients]  = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();
  

  const ingredientsAddHandler = useCallback(ingredients =>{
    setIsLoading(true)
    fetch('https://react-burger-app-ab541.firebaseio.com/orders.json',{
      method : 'POST',
      body : JSON.stringify(ingredients),
      headers : {'Content-Type' : 'application/json'}
    }).then(response =>{
        setIsLoading(false)
        return response.json()
    }).then(resData =>{
      // setUserIngrdients(prevIngrdients =>[
      //   ...prevIngrdients,
      //   {id:resData.name,...ingredients}
      // ])
      dispatch({
        type:'ADD',
        ingredients : ingredients
      })
    })    
    
  },[])
  // console.log(isLoading)
  const removeIngredientsHandler = useCallback(ingredientId => {
    setIsLoading(true)
    fetch(`https://react-burger-app-ab541.firebaseio.com/orders/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response=>{
      setIsLoading(false) 
      dispatch({
        type:'DELETE',
        id : ingredientId
      })
    }).catch(error =>{
      setIsError(error.message);
      setIsLoading(false);
    })
  },[])

  const onLoadIngredientsHandler =useCallback(ingredients =>{
    dispatch({
      type:'SET',
      ingredients : ingredients
    })
  },[]);

  const clearError =() =>{
    setIsError(null)
  }
  return (
    <div className="App">
      {isError && <ErrorModal onClose = {clearError}>{isError}</ErrorModal>}
      <IngredientForm ingredientsAddHandler = {ingredientsAddHandler} isLoading = {isLoading}/>
      <section>
        <Search onLoadIngredients = {onLoadIngredientsHandler} />
        <IngredientList ingredients={userIngrdients} onRemoveItem = {removeIngredientsHandler} />
      </section>
    </div>
  );
})

export default Ingredients;
