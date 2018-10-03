$(function () {

    const clearFields = function () {
        let fields = document.querySelectorAll('input');
        for (let i = 0; i < fields.length; i++) {
            fields[i].value = "";
        }
    };

    const locateUserByName = function (username) {
        for (let i = 0; i < employeeList.length; i++) {
            if (employeeList[i].name === username) {
                return i;// returns index location of the user in employeeList
            }
        }
        return -1; // -1 is returned when the user does not exist
    };

    const addUser = function (newName, newOfficeNum, newPhoneNum) {
        const newUser = {
            name: newName,
            officeNum: newOfficeNum,
            phoneNum: newPhoneNum
        };
        employeeList.push(newUser);
        renderView();
        clearFields();
    };

    const verifyUser = function (verifyName) {
        // User does not exist -> Returns false
        if (locateUserByName(verifyName) === -1) {
            contentRef.innerHTML = `<p>Sorry -- ${verifyName} does not exist.  Please check to see you typed their name correctly.</p>`;
        }
        else {
            contentRef.innerHTML = `<p>Yes -- ${verifyName} exists</p>`;
        }
    };

    const updateUser = function (updateName, updateOfficeNumber, updatePhoneNumber) {
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

    const deleteUser = function (removeName) {
        employeeList.splice(locateUserByName(removeName, 1));
        renderView();
    };

    const renderView = function () {
        let finalHTML = ``;

        for (let i = 0; i < employeeList.length; i++) {
            finalHTML += `<div class="user"><h2>Name: ${employeeList[i].name}</h2><h2>Office #${employeeList[i].officeNum}</h2><h2>Phone #: ${employeeList[i].phoneNum}</h2></div>`;
        }

        contentRef.innerHTML = finalHTML;
        return false;
    };

    const setQueryBar = function (e) {
        e.preventDefault();

        if ($(this).attr('id') === 'viewbutton') {
            nameQuery.type = "hidden";
            officeQuery.type = "hidden";
            phoneNumQuery.type = "hidden";
            queryButtonRef.visibility = "hidden";
            renderView();
        }
        else if ($(this).attr('id') === 'addbutton') {
            nameQuery.type = "name";
            officeQuery.type = "phone";
            phoneNumQuery.type = "name";
            queryButtonRef.visibility = "visible";
        }
        else if ($(this).attr('id') === 'verifybutton'){
            nameQuery.type = "name";
            officeQuery.type = "hidden";
            phoneNumQuery.type = "hidden";
            queryButtonRef.visibility = "visible";
        }
        else if ($(this).attr('id') === 'updatebutton') {
            nameQuery.type = "name";
            officeQuery.type = "phone";
            phoneNumQuery.type = "name";
            queryButtonRef.visibility = "visible";
        }
        else if ($(this).attr('id') === 'deletebutton') {
            nameQuery.type = "name";
            officeQuery.type = "hidden";
            phoneNumQuery.type = "hidden";
            queryButtonRef.visibility = "visible";
        }
        return false;
    };

    const nameQuery = document.querySelector('#nameField');
    const officeQuery = document.querySelector('#officePhoneField');
    const phoneNumQuery = document.querySelector('#phoneNumField');
    const queryButtonRef = document.querySelector('#queryButton');
    const contentRef = document.querySelector('main');

    $('.buttonset').on('click', setQueryBar);
//    $('#addbutton').on('click', setQueryBar('add'));
//    $('#verifybutton').on('click', setQueryBar('verify'));
//    $('#updatebutton').on('click', setQueryBar('update'));
//    $('#deletebutton').on('click', setQueryBar('delete'));

});