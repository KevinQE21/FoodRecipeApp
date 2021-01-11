import React, {useState} from 'react';
import './App.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';
import Alert from './components/Alert';

const App = () => {
    const [query, setQuery] = useState('');
    const [recipes, setrecipes] = useState([]);
    const [alert, setAlert] = useState('');

    const APP_ID = '35c6ca2e';
    const APP_KEY = '9e890929f8898cc7ce56be8d77bc8666';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async () => {
        if(query !== ''){
            const result = await Axios.get(url);//Genera la consulta get al API
            if(!result.data.more){
                return setAlert('No food with such name');
            }
            setrecipes(result.data.hits);
            setAlert('');
            setQuery('');//Limpia el query despues de buscado
        }else{
            setAlert('Please fill the form');
        }
    }

    const onChange = (e) =>{
        setQuery(e.target.value);//Genera el cambio de state 
    }
    
    const onSubmit = (e) => {
        e.preventDefault();//Previene el reload de la pagina completa
        getData();
    }

    return (
        <div className='App' >
            <h1 onClick={getData}>Food Searching App</h1>
            <form className='search-form' onSubmit={onSubmit}>
                {alert !== '' && <Alert alert={alert}/>}
                <input type='text' placeholder='Search Food....' 
                    autoComplete='off' onChange={onChange} 
                    value={query}/>
                <input type='submit' value='search' />
            </form> 
            <div className='recipes'>
                {recipes !== [] && recipes.map(recipe => 
                <Recipe key={uuidv4()} recipe={recipe} />)}
            </div>
        </div>
    );
}

export default App;
