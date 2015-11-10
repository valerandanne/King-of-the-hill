define([],function() {
    'use strict';
   
    var DBusers = window.localStorage.getItem("Dbusers");
    DBusers =JSON.parse(DBusers); 
    
    if(DBusers === null){
        DBusers = [];
    }
    
    function saveUser(userJson) {
        
        DBusers.push(userJson);
    }
    
    return{
        saveUser:saveUser
    };
    
});