$(function () {

    const clearFields = function () {
        let fields = $('input');
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
        const newPhoneNum = $('.field3').val();

        const newUser = {
            name: newName,
            officeNum: newOffice,
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
            $('main').html(`<p>Sorry -- ${verifyName} does not exist.  Please check to see you typed their name correctly.</p>`);
        }
        else {
            $('main').html(`<p>Yes -- ${verifyName} exists</p>`);
        }
        clearFields();
        return false;
    };

    const updateUser = function () {

        const updateName = $('#nameField').val();
        const updateOfficeNumber = $('#officeField').val();
        const updatePhoneNumber = $('#phoneNumField').val();

        //Check first to escape out with an alert if the user does not exist
        if (locateUserByName(updateName) === -1) {
            $('main').text = `User does not exist`;
        }

        else {
            //Make updates to this persons' officeNum and phoneNum in the employeeList
            employeeList[locateUserByName(updateName)].officeNum = updateOfficeNumber;
            employeeList[locateUserByName(updateName)].phoneNum = updatePhoneNumber;
            renderView();
        }
        clearFields();
        return false;
    };

    const deleteUser = function () {

        const removeName = $('#nameField').val();

        if (locateUserByName(removeName) === -1) {
            $('main').text = `User does not exist`;
        }
        else {
            employeeList.splice(locateUserByName(removeName), 1);
            renderView();
        }
        clearFields();
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

        const button1 = `<input type="name" class="field field1" id="nameField" aria-describedby="searchUser"
                   placeholder="Enter Name">`;
        const button2 = `<input type="phone" class="field field2" id="officeField" aria-describedby="searchUser"
                   placeholder="Enter Office Number">`;
        const button3 = `<input type="name" class="field field3" id="phoneNumField" aria-describedby="searchUser"
                   placeholder="Enter Phone Number">`;
        const button4 = `<button id="queryButton">TEXT</button>`;

        
        if ($(this).attr('id') === 'viewbutton') {
            $('.field').fadeOut(1000, function() { $(this).remove(); });
            $('.inputWrapper').empty();
            //$('#queryButton').fadeOut(1000, function() { $(this).remove(); });
            renderView();
        }
        else if ($(this).attr('id') === 'addbutton') {
            $('.field').fadeOut(1000, function() { $(this).remove(); });
            $('.inputWrapper').empty();
            $('.inputWrapper').html(`${button1}${button2}${button3}${button4}`);  
            $('.inputWrapper').fadeIn(1000);
            $('#queryButton').on('click', addUser);
            $('#queryButton').text('ADD');
        }
        else if ($(this).attr('id') === 'verifybutton') {
            $('.field').fadeOut(1000, function() { $(this).remove(); });
            $('.inputWrapper').html(`${button1}${button4}`); 
            $('.inputWrapper').fadeIn(1000);
            $('#queryButton').on('click', verifyUser);
            $('#queryButton').text('VERIFY');
        }
        else if ($(this).attr('id') === 'updatebutton') {
            $('.inputWrapper').html(`${button1}${button2}${button3}${button4}`);  
            //$(nameQuery).fadeIn();
            //$(officeQuery).fadeIn();
            //$(phoneNumQuery).fadeIn();
            //$(queryButtonRef).fadeIn();
            $('#queryButton').on('click', updateUser);
            $('#queryButton').text('UPDATE');
        }
        else if ($(this).attr('id') === 'deletebutton') {
            $('.inputWrapper').html(`${button1}${button4}`); 
            //$(nameQuery).fadeIn();
            $('#officeField').fadeOut(1000, function() { $(this).remove(); });
            $('#phoneNumField').fadeOut(1000, function() { $(this).remove(); });
            //$(queryButtonRef).fadeIn();
            $('#queryButton').on('click', deleteUser);
            $('#queryButton').text('DELETE');
        }
        return false;
    };
/*
    const nameQuery = $('#nameField');
    const officeQuery = $('#officeField');
    const phoneNumQuery = $('#phoneNumField');
    const queryButtonRef = $('#queryButton');
    const contentRef = $('main');*/

    // Set initial state of search bar (hidden)
    /*
    $(nameQuery).hide();
    $(officeQuery).hide();
    $(phoneNumQuery).hide();
    $(queryButtonRef).hide();*/

    $('.buttonset').on('click', setQueryBar);
});