import { useState, useEffect  } from "react";
import './grocery-style.css';

import { FaPlusCircle } from "react-icons/fa";

export default function MyGrocery() {

    // 
    const [checkedState_, setCheckedState_] = useState(
        new Array().fill(false)
    );
    const [groceryCollection, setGroceryCollection] = useState([]);  
   
    const [isDisabled, setIsDisabled] = useState(true);
    const [cat, setCat] = useState('');
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        var myGrocery_ = JSON.parse(localStorage.getItem('myGrocery_') || "[]");
        
        if (myGrocery_.length == 0) {
            console.log("empty");       
            // get grocery collection from server
            getGroceryCollection(true);
        }
        else {
            console.log("loading");
            // get grocery collection state from local-storage
            getGroceryCollection(false);
        }
    }, []);

    const handleOnChange = (position) => {
        const updatedCheckedState_ = checkedState_.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState_(updatedCheckedState_);
        console.log(updatedCheckedState_);
        localStorage.setItem("myGrocery_", JSON.stringify(updatedCheckedState_));
    };

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
        if (event.target.value == '' || event.target.value == null)
            return;
        else {
            setItemName(event.target.value);
        }
    }

    const getGroceryCollection = (flag) => {
        setGroceryCollection([]);
        fetch('/grocery')
            .then(res => res.json())
            .then(data => {
                setGroceryCollection(data);

                if (flag) {
                    console.log('loading from server!');
                    // first time
                    // from server
                    var updatedCheckedState_ = data.map((item, index) =>
                        false
                    );
                    setCheckedState_(updatedCheckedState_);
                    localStorage.setItem("myGrocery_", JSON.stringify(updatedCheckedState_));
                }
                else {
                    // any time after first time
                    // from local-storage
                    console.log('loading from local-storage!');
                    var myGrocery_ = JSON.parse(localStorage.getItem('myGrocery_') || "[]");
                    var updatedCheckedState_ = myGrocery_.map((item, index) =>
                        item
                    );
                    setCheckedState_(updatedCheckedState_);
                }
            }
        );
    }
    const addNewItem = () => {
        
        if (cat === '' || itemName === '') {
            console.log('Error : Item Name is Empty!')
            return;
        }
        console.log(cat + ' : ' + itemName);
        
        // add cat and itemName to grocery-items.js file
        // api call
        var data = {
            cat: cat,
            name: itemName
        };
        fetch('/grocery/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(json => {
                console.log(json); 
            }
        );
    }
    
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
                    <ul >
                        <li>
                            Do Check To Add Item To Your Grocery List
                        </li>
                        <li>
                            Undo Check To Remove Item (Or) Bought Item From Your Grocery List
                        </li>
                    </ul>
                    <hr />
                    <p></p>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="addNewListItem">
                                <form>
                                    <select
                                        className={"form-control"}
                                        style={{height: 40, borderColor: 'green', borderWidth: 3, color: 'blue' }}
                                        id="cat"
                                        value={cat}
                                        onChange={onChangeCategory}
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
                                            onChange={onChangeItemName}
                                            disabled={isDisabled}
                                        />
                                    </span>
                                </form>
                            </div>
                        </div>                     
                        <div className="col-sm-2 verticalCenter">
                            <button className="btn btn-block "
                                onClick={addNewItem}>
                                <FaPlusCircle style={{ color: 'green', fontSize: '50px' }} />                                
                            </button>
                        </div>
                    </div>
                             
                </div>
            </div>
            <p></p>


            
            <div className="col-sm-4">
                <h3>Fruits</h3>
                <ul className="grocery-list">
                    {groceryCollection.map(({ name, cat }, index) => {
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
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState_[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
                <h3>Frozen</h3>
                <ul className="grocery-list">
                    {groceryCollection.map(({ name, cat }, index) => {
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
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState_[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
            </div>

            <div className="col-sm-4">              
                <h3>Vegitables</h3>
                <ul className="grocery-list">
                    {groceryCollection.map(({ name, cat }, index) => {
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
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState_[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
                <h3>Bakery</h3>
                <ul className="grocery-list">
                    {groceryCollection.map(({ name, cat }, index) => {
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
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState_[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
                       
            </div>

            <div className="col-sm-4">
                <h3>Others</h3>
                <ul className="grocery-list">
                    {groceryCollection.map(({ name, cat }, index) => {
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
                                                            id={`custom-checkbox-${index}`}
                                                            name={name}
                                                            value={name}
                                                            checked={checkedState_[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />&nbsp;
                                                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                                    </span>
                                                </span>
                                            </li>
                                        </span>
                                    )
                                }

                            </span>
                        );
                    })}
                </ul>
            </div>

            
        

        
            
        </div>
    );
}