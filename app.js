// app.js

// employeeList = name, officeNum, phoneNum

function locateUserByName(username){
    for(let i = 0; i < employeeList.length; i++){
        if(employeeList[i].name === username) return i; // returns index location of the user in employeeList
    }
    return -1; // -1 is returned when the user does not exist
}

function addUser(newName, newOfficeNum, newPhoneNum){
    const newUser = {
        name: newName,
        officeNum: newOfficeNum,
        phoneNum: newPhoneNum
    }
    employeeList.push(newUser);
}

function existsUser(){
    //will fill this in later if needed

}

function verifyUser(verifyName){
    // User does not exist -> Returns false
    if(locateUserByName(verifyName) === -1){
        return false;
    }
    else{
        return true;
    }
}

function updateUser(updateName, updateOfficeNumber, updatePhoneNumber){
    //Check first to escape out with an alert if the user does not exist
    if (locateUserByName(updateName) == -1){
        alert(`User does not exist`);
        return;
    }
    //Make updates to this persons' officeNum and phoneNum in the employeeList
    employeeList[locateUserByName(updateName)].officeNum = updateOfficeNumber;
    employeeList[locateUserByName(updateName)].phoneNum = updatePhoneNumber;
}

function deleteUser(removeName){
    employeeList.splice(locateUserByName(removeName, 1));
}

function renderView(){
    let finalHTML = ``;
    const contentRef = document.querySelector('main');

    for (let i = 0; i < employeeList.length; i++){
        finalHTML += `<div class="userEntry"><h3>${employeeList.name}</h3><h3>${employeeList.officeNum}</h3><h3>${employeeList.phoneNum}</h3></div>`;
    }
}

//Initialize event listeners on <li> items
const navList = document.querySelector('ul');
navList.li[0].addEventListener('click', renderView);
navList.li[1].addEventListener('click', renderView);
navList.li[2].addEventListener('click', renderView);
navList.li[3].addEventListener('click', renderView);
navList.li[4].addEventListener('click', renderView);