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

    const addUser = function () {
        const newName = $('.field1').val();
        const newOffice = $('.field2').val();
        const newOne = parseInt(newOffice); //confusion here
        const newPhoneNum = $('.field3').val();

        const newUser = {
            name: newName,
            officeNum: newOne,
            phoneNum: newPhoneNum
        };

        employeeList.push(newUser);
        renderView();
        clearFields();
        return false;
    };

    const verifyUser = function () {
        const verifyName = $('.field1').val();
        console.log(verifyName);

        // User does not exist -> Returns false
        if (locateUserByName(verifyName) === -1) {
            $(contentRef).html(`<p>Sorry -- ${verifyName} does not exist.  Please check to see you typed their name correctly.</p>`);
        }
        else {
            $(contentRef).html(`<p>Yes -- ${verifyName} exists</p>`);
        }
        return false;
    };

    const updateUser = function () {

        const updateName = $('#nameField').val();
        const updateOfficeNumber = $('#officeField').val();
        const updatePhoneNumber = $('#phoneNumField').val();

        //Check first to escape out with an alert if the user does not exist
        if (locateUserByName(updateName) === -1) {
            $(contentRef).text = `User does not exist`;
        }

        else {
            //Make updates to this persons' officeNum and phoneNum in the employeeList
            employeeList[locateUserByName(updateName)].officeNum = updateOfficeNumber;
            employeeList[locateUserByName(updateName)].phoneNum = updatePhoneNumber;
            renderView();
        }
        return false;
    };

    const deleteUser = function () {

        const removeName = $('#nameField').val();

        if (locateUserByName(removeName) === -1) {
            $(contentRef).text = `User does not exist`;
        }
        else {
            employeeList.splice(locateUserByName(removeName), 1);
            renderView();
        }
        return false;
    };

    const clearView = function () {
        $('main').empty();
    };

    const renderView = function () {
        clearView();

        for (let i = 0; i < employeeList.length; i++) {
            const fadeInCard = $(`<div class="user"><h2>Name: ${employeeList[i].name}</h2><h2>Office #${employeeList[i].officeNum}</h2><h2>Phone #: ${employeeList[i].phoneNum}</h2></div>`).hide().fadeIn(1000);
            $('main').append(fadeInCard);
        }

        return false;
    };

    const setQueryBar = function (e) {
        e.preventDefault();
        clearView();
        console.log($(this).attr('id'));
        if ($(this).attr('id') === 'viewbutton') {
            $(nameQuery).hide();
            $(officeQuery).hide();
            $(phoneNumQuery).hide();
            $(queryButtonRef).hide();
            renderView();
        }
        else if ($(this).attr('id') === 'addbutton') {
            $(nameQuery).show();
            $(officeQuery).show();
            $(phoneNumQuery).show();
            $(queryButtonRef).show();
            $(queryButtonRef).on('click', addUser);
        }
        else if ($(this).attr('id') === 'verifybutton') {
            $(nameQuery).show();
            $(officeQuery).hide();
            $(phoneNumQuery).hide();
            $(queryButtonRef).show();
            $(queryButtonRef).on('click', verifyUser);
        }
        else if ($(this).attr('id') === 'updatebutton') {
            $(nameQuery).show();
            $(officeQuery).show();
            $(phoneNumQuery).show();
            $(queryButtonRef).show();
            $(queryButtonRef).on('click', updateUser);
        }
        else if ($(this).attr('id') === 'deletebutton') {
            $(nameQuery).show();
            $(officeQuery).hide();
            $(phoneNumQuery).hide();
            $(queryButtonRef).show();
            $(queryButtonRef).on('click', deleteUser);
        }
        return false;
    };

    const nameQuery = document.querySelector('#nameField');
    const officeQuery = document.querySelector('#officePhoneField');
    const phoneNumQuery = document.querySelector('#phoneNumField');
    const queryButtonRef = document.querySelector('#queryButton');
    const contentRef = document.querySelector('main');

    // Set initial state of search bar (hidden)
    $(nameQuery).hide();
    $(officeQuery).hide();
    $(phoneNumQuery).hide();
    $(queryButtonRef).hide();

    $('.buttonset').on('click', setQueryBar);
});