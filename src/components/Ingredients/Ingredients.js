import React,{useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () =>{

  const [userIngrdients, setUserIngrdients]  = useState([]);

    useEffect(() =>{
      fetch('https://react-burger-app-ab541.firebaseio.com/orders.json')
      .then(response => response.json())
      .then(responseData =>{
        const ingredientsLoaded = []
        // console.log(responseData)
        for(const ing in responseData){
          ingredientsLoaded.push({
            id: ing,
            title : responseData[ing].title,
            amount : responseData[ing].amount
          })
        }
        // console.log(ingredientsLoaded)
        setUserIngrdients(ingredientsLoaded);
      })
    },[]);

  const ingredientsAddHandler = ingredients =>{
    fetch('https://react-burger-app-ab541.firebaseio.com/orders.json',{
      method : 'POST',
      body : JSON.stringify(ingredients),
      headers : {'Content-Type' : 'application/json'}
    }).then(response =>{
        return response.json()
    }).then(resData =>{
      setUserIngrdients(prevIngrdients =>[
        ...prevIngrdients,
        {id:resData.name,...ingredients}
      ])
    })    
    
  }

  const removeIngredientsHandler = ingredientId =>{
        setUserIngrdients(prevIngredients=> 
            prevIngredients.filter((ingredient)=>
            ingredient.id !== ingredientId))
  }

  return (
    <div className="App">
      <IngredientForm ingredientsAddHandler = {ingredientsAddHandler}/>
      <section>
        <Search />
        <IngredientList ingredients={userIngrdients} onRemoveItem = {removeIngredientsHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
