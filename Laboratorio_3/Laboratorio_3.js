//Problema#1
function Palindromo (t){
const rvers = t.split("").reverse().join("");
if (t<0){
return "no es palindromo porque es menor que cero"
}else if (t>0 && t < 10){
return "Es palindromo de base 10" 
}else if (t>=10){  
    if (rvers===t)
    return "Es palindromo de doble base"
    else 
    return "no es palindromo"
}

}

//console.log(Palindromo("33"))

//Problema#2
function ContarCarater(frase){
    if (typeof frase != 'string'){
        throw TypeError("el argumento no  es valido, debe introducir una cadena");
    }
    
    let conteo={};
    
    frase.replace(/\S/g, function(p){
        conteo[p]=(isNaN(conteo[p]) ? 1 : conteo[p]+1);
    } );
    return conteo;
    }
    
  //  console.log (ContarCarater("DESARROLLO XI"));

//Problema#3
function CalculaBisiesto(year){
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return "el año es bisiesto";
    } else {
        return "el año no es bisiesto";
    }
    
    }
    //console.log(CalculaBisiesto(2005))

//Problema#4
function SumaTotal(n) {
    function esPrimo(numero) {
        if (numero <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i === 0) {
                return false;
            }
        }
        return true;
    }

    let suma = 1;
    for (let i = 2; i <= n; i++) {
        if (esPrimo(i)) {
            suma += i;
        }
    }
    return suma;
}

//console.log("La suma total del numero brindado es: "+ SumaTotal(5))