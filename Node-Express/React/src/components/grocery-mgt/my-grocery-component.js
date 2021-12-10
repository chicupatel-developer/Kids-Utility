import { useState, useEffect  } from "react";
import './grocery-style.css';

import { FaPlusCircle, FaSave } from "react-icons/fa";

export default function MyGrocery() {

    const [groceryCollection, setGroceryCollection] = useState([]);  
    const [cat, setCat] = useState('');
    const [itemName, setItemName] = useState('');
    const [selected, setSelected] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true);  

    useEffect(() => {
        getGroceryCollection();
    }, []);


    const getCategories = () => {
        return ["Fruit", "Frozen", "Vegitables", "Bakery", "Others"];
    }

    let categoryList = getCategories().length > 0
        && getCategories().map((item, i) => {
            return (
                <option key={i} value={item} >
                    {item}
                </option>
            )
        }, this);

    const onChangeCategory = (event) => {
        console.log(event.target.value);

        if (event.target.value == '' || event.target.value == null) {
            // disable new grocery list item textbox
            setIsDisabled(true);
            setItemName('');
            setCat('');
            return;
        }
        setIsDisabled(false);
        setCat(event.target.value);
    }

    const onChangeItemName = (event) => {
        console.log(event.target.value);
        if (event.target.value == '')
            return;
        else {
            setItemName(event.target.value);
        }
    }

    const getGroceryCollection = () => {
        setGroceryCollection([]);
        fetch('/grocery')
            .then(res => res.json())
            .then(data => {
                setGroceryCollection(data);
                console.log(data);
            }
        );
    }
    const addNewItem = () => {
        
        if (cat === '' || itemName === '') {
            console.log('Error : Item Name is Empty!')
            return;
        }
        console.log(cat + ' : ' + itemName);
        
        var data = {
            cat: cat,
            name: itemName,
            selected: false
        };
        fetch('/grocery/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                getGroceryCollection();
                setItemName('');
                setCat('');
            }
        );
    }

    const saveMyList = () => {

        console.log(groceryCollection);
        // send groceryList to server
        fetch('/grocery/edit', {
            method: 'POST',
            // body: JSON.stringify(groceryCollection),
            body: JSON.stringify(groceryCollection),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json);
            }
        );
    }

    const updateFieldChanged = index => e => {

        console.log(e.target.value); // Apple
        console.log(e.target.checked); // true, false

        console.log('index: ' + index);
        console.log('property name: ' + e.target.value);
        let newArr = [...groceryCollection]; // copying the old datas array
        newArr[index].selected = e.target.checked; // replace e.target.value with whatever you want to change it to

        setGroceryCollection(newArr);
    }

    let displayFruitGroceryCollection = groceryCollection.map(({ name, cat, selected }, index) => {
        return (
            <span key={index}>
                {
                    cat == "Fruit" && (
                        <span>
                            <li key={index}>
                                <span className="grocery-list-item">
                                    <span>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            name={name}
                                            value={name}
                                            checked={selected}
                                            onChange={updateFieldChanged(index)}                                        
                                        >
                                        </input>
                                        <label>&nbsp;&nbsp;&nbsp;{name}</label>
                                    </span>
                                </span>
                            </li>
                        </span>
                    )
                }
            </span>
        );
    }, this);
    let displayVegitablesGroceryCollection = groceryCollection.map(({ name, cat, selected }, index) => {
        return (
            <span key={index}>
                {
                    cat == "Vegitables" && (
                        <span>
                            <li key={index}>
                                <span className="grocery-list-item">
                                    <span>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            name={name}
                                            value={name}
                                            checked={selected}
                                            onChange={updateFieldChanged(index)}
                                        >
                                        </input>
                                        <label>&nbsp;&nbsp;&nbsp;{name}</label>
                                    </span>
                                </span>
                            </li>
                        </span>
                    )
                }
            </span>
        );
    }, this);
    let displayOthersGroceryCollection = groceryCollection.map(({ name, cat, selected }, index) => {
        return (
            <span key={index}>
                {
                    cat == "Others" && (
                        <span>
                            <li key={index}>
                                <span className="grocery-list-item">
                                    <span>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            name={name}
                                            value={name}
                                            checked={selected}
                                            onChange={updateFieldChanged(index)}
                                        >
                                        </input>
                                        <label>&nbsp;&nbsp;&nbsp;{name}</label>
                                    </span>
                                </span>
                            </li>
                        </span>
                    )
                }
            </span>
        );
    }, this);
    let displayFrozenGroceryCollection = groceryCollection.map(({ name, cat, selected }, index) => {
        return (
            <span key={index}>
                {
                    cat == "Frozen" && (
                        <span>
                            <li key={index}>
                                <span className="grocery-list-item">
                                    <span>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            name={name}
                                            value={name}
                                            checked={selected}
                                            onChange={updateFieldChanged(index)}
                                        >
                                        </input>
                                        <label>&nbsp;&nbsp;&nbsp;{name}</label>
                                    </span>
                                </span>
                            </li>
                        </span>
                    )
                }
            </span>
        );
    }, this);
    let displayBakeryGroceryCollection = groceryCollection.map(({ name, cat, selected }, index) => {
        return (
            <span key={index}>
                {
                    cat == "Bakery" && (
                        <span>
                            <li key={index}>
                                <span className="grocery-list-item">
                                    <span>
                                        <input
                                            type="checkbox"
                                            id={name}
                                            name={name}
                                            value={name}
                                            checked={selected}
                                            onChange={updateFieldChanged(index)}
                                        >
                                        </input>
                                        <label>&nbsp;&nbsp;&nbsp;{name}</label>
                                    </span>
                                </span>
                            </li>
                        </span>
                    )
                }
            </span>
        );
    }, this);
    
    return (
        <div className="row">

            <div >
                <div className="row">
                    <div className="col-sm-4">
                    </div>
                    <div className="col-sm-4">
                        <div className="groceryListHeader">
                            <h3>Grocery List</h3>
                        </div>
                    </div>
                    <div className="col-sm-4">
                    </div>
                </div>                              
                <p></p>
                <div className="groceryListHeaderDetails">              
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="addNewListItem">
                                <form>
                                    <select
                                        className={"form-control"}
                                        style={{height: 40, borderColor: 'green', borderWidth: 3, color: 'blue' }}
                                        id="cat"
                                        value={cat}
                                        onChange={e => onChangeCategory(e)}
                                        name="cat">
                                        <option value=''>
                                            ---select category---
                                        </option>
                                        {categoryList}
                                    </select>
                                    <p></p>
                                    <span className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Item Name"
                                            style={{height: 40, borderColor: 'green', borderWidth: 3, color: 'blue' }}
                                            className={"form-control"}
                                            id="itemName"
                                            value={itemName}
                                            name="itemName"
                                            onChange={e => onChangeItemName(e)}
                                            disabled={isDisabled}
                                        />
                                    </span>
                                </form>
                            </div>
                        </div>                     
                        <div className="col-sm-5 verticalCenter">
                            <button className="btn btn-block "
                                onClick={addNewItem}>                                
                                <FaPlusCircle style={{ color: 'green', fontSize: '50px' }} />
                                &nbsp;&nbsp;<b>Add New Grocery Item Here!</b>
                            </button>
                        </div>
                    </div>
                             
                </div>
            </div>
            <p></p>
            
            <div className="groceryListContainer">
                <div className="row">
                    <div className="col-sm-3">
                        <button className="btn btn-block "
                            onClick={saveMyList}>
                            <FaSave style={{ color: 'green', fontSize: '50px' }} />
                            &nbsp;&nbsp;<b>Save My List!</b>
                        </button>
                    </div>
                    <div className="col-sm-9">
                        <ul >
                            <li>
                                Do Check To Add Item To Your Grocery List
                            </li>
                            <li>
                                Undo Check To Remove Item (Or) Bought Item From Your Grocery List
                            </li>
                        </ul>
                    </div>
                </div>
            
                <p></p>
                <hr />
                <p></p>
                <div className="row">
                    <div className="col-sm-4">
                        <h3><u>Fruits</u></h3>
                        <ul className="grocery-list">
                            {displayFruitGroceryCollection}
                        </ul>
                        <h3><u>Frozen</u></h3>
                        <ul className="grocery-list">
                            {displayFrozenGroceryCollection}
                        </ul>
                    </div>

                    <div className="col-sm-4">
                        <h3><u>Vegitables</u></h3>
                        <ul className="grocery-list">
                            {displayVegitablesGroceryCollection}
                        </ul>
                        <h3><u>Bakery</u></h3>
                        <ul className="grocery-list">
                            {displayBakeryGroceryCollection}
                        </ul>
                    </div>

                    <div className="col-sm-4">
                        <h3><u>Others</u></h3>
                        <ul className="grocery-list">
                            {displayOthersGroceryCollection}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}