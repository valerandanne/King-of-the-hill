define(['./usersDb'],function(usersDb){
    'use strict';
    
    var xmlhttp = new XMLHttpRequest();

    var url = '';
    
        
    function userDataRequest(){
        
        url= 'http://localhost:5000/auth/facebook/callback';
        var user;
        xmlhttp.onreadystatechange = function() {
         
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                user = xmlhttp.responseText; // response is a user in JSON format from server
            }
        };
    
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
        usersDb.saveUser(user);
        window.console.log(user):
        
    }
    
    function saveScores() {
        
        
    }
    
    return {
        userDataRequest: userDataRequest,
        postScores : saveScores
    };
});