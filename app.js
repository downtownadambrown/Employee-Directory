// app.js

// employeeList = name, officeNum, phoneNum

const locateUserByName = username => {
    for (let i = 0; i < employeeList.length; i++) {
        if (employeeList[i].name === username) {
            return i;// returns index location of the user in employeeList
        }
    }
    return -1; // -1 is returned when the user does not exist
};

const addUser = (newName, newOfficeNum, newPhoneNum) => {
    const newUser = {
        name: newName,
        officeNum: newOfficeNum,
        phoneNum: newPhoneNum
    };
    employeeList.push(newUser);
    renderView();
};

const verifyUser = (verifyName) => {
    // User does not exist -> Returns false
    if (locateUserByName(verifyName) === -1) {
        //return false;
    }
    else {
        //return true;
    }
};

const updateUser = (updateName, updateOfficeNumber, updatePhoneNumber) => {
    //Check first to escape out with an alert if the user does not exist
    if (locateUserByName(updateName) === -1) {
        alert(`User does not exist`);
    }
    else {
        //Make updates to this persons' officeNum and phoneNum in the employeeList
        employeeList[locateUserByName(updateName)].officeNum = updateOfficeNumber;
        employeeList[locateUserByName(updateName)].phoneNum = updatePhoneNumber;
        renderView();
    }
};

const deleteUser = (removeName) => {
    employeeList.splice(locateUserByName(removeName, 1));
    renderView();
};

const renderView = () => {
    let finalHTML = ``;
    const contentRef = document.querySelector('main');

    for (let i = 0; i < employeeList.length; i++) {
        finalHTML += `<div class="user"><h2>${employeeList[i].name}</h2><h2>${employeeList[i].officeNum}</h2><h2>${employeeList[i].phoneNum}</h2></div>`;
    }

    contentRef.innerHTML = finalHTML;
};

//Initialize event listeners on <li> items
const navList = document.querySelectorAll('li');
const nameQuery = document.querySelector('#nameField');
const officePhoneQuery = document.querySelector('#officePhoneField');
const phoneNumQuery = document.querySelector('#phoneNumField');

renderView();