  
var saludar = function () {
    myBody = document.getElementsByTagName('body')[0];
    var nombre = prompt("Ingrese su nombre");
    if ( nombre !== '' ) {
    var mensaje = document.createTextNode("hola" + " " + nombre);
    
    myBody.appendChild(mensaje);
    }
    
   
};

var generarTabla = function () {
    
    var body = document.getElementsByTagName('body')[0];
    var tabla = document.createElement('table');
    var tblBody = document.createElement('tbody');
    var num = 1
    for (var i=0 ; i < 2 ; i++)
    {
        var hilera = document.createElement('tr');
        
        for ( var j= 0 ; j < 2 ; j++)
        {
            var celda = document.createElement('td');
            
            var texto = prompt('Ingrese texto de celda ' + num);
            
            var textoCelda = document.createTextNode(texto);
            num = num + 1;
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
   tabla.addEventListener('click' , changeColorOnClick , false);
};

var changeColorOnClick = function (){
    this.style.background = 'pink' ;
    this.style.color = 'black' ;
}
var color = function () {
    
    myBody = document.getElementsByTagName('body')[0];
    myBodyElements = myBody.getElementsByTagName("p");
    myP = myBodyElements[1];
    
    myP.style.background= "rgb(255,0,0)";
}

var serVivo = function (name) {
    this.name=name; 
};
serVivo.prototype.get_name = function () {
    return this.name ;
}
serVivo.prototype.says = function () {
    return this.saying || ' ' ;
}


var nuevoSer = new serVivo(prompt("nombre"));
var name = nuevaPersona.get_name();
var txt = document.createTextNode(name);
myBody = document.getElementsByTagName('body')[0];
myBody.appendChild(txt);


var humano = function (name) {
this.name = name;
this.saying = 'hola';    
}
humano.prototype = new serVivo();

var perro = {
    name : 'Goran el ovejero',
    get_name : function () {
        return this.name;
    },
    says : function () { 
        return this.saying || '' ;
    }
};
var gato = Object.create(perro);
gato.name = 'paco' ;
gato.says = 'miaw' ;



    
