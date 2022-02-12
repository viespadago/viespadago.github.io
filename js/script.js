//funcion general que se ejecuta constantemente para detectar eventos como la pulsación de botones o la selección de selects
$(function() {
    // declaración de variables generales
    var email = $('#email');
    var name = $('#name');
    var description = $('#description');
    var country = document.getElementById("country");
    var city = document.getElementById("city");
    var regButton = $('#regButton');
    let pais ="";
    let ciudades = [];
    let avatar = "";

    
    // GET que llama a una API y consigue información de paises y ciudades
 var settings = {
  "url": "https://countriesnow.space/api/v0.1/countries",
  "method": "GET",
  "timeout": 0,
};

    //rellena el select COUNTRY con una lista de paises optenidos de la API
$.ajax(settings).done(function (response) {
    country.innertHTML = '';
  //console.log(response);
    for(let item of response.data){
      country.innerHTML += `
                        <option value='${item.iso3}' selected>${item.country}</option> 
                    `
    };
    
    //Por defecto selecciona Spain/España, llama a la funcion FULLCITIES que rellena las ciudades y selecciona Barcelona
    var selectedIndex="ESP"; 
    $('#country').val(selectedIndex);
    fillCities(); 
    $('#city').val(279);
      
    //evento que detecta cuando se cambia la selección de COUNTRY y llama a la funcion FULLCITIES que rellena las ciudades
    country.addEventListener('change', (event) => {
        fillCities();   
    $('#city').val(0);
    });
    
    //evento que detecta si se selecciona la opción de continuar en la lista de CITY y las rellena del todo
    city.addEventListener('change', (event) => {
            if (city.value=="continuar"){ 
                 city.innerHTML = '';
                for (i=0; i<ciudades.length;i++){  
                    city.innerHTML += `
                        <option value='${i}' selected>${ciudades[i]}</option> 
                    `;}
                $('#city').val(300);
            };
    });
    
    //funcion FULLCITIES que rellena las ciudades, si son más de 300 solo carga las 300 primeras
    function fillCities(){
        city.innerHTML = '';
         var selectPais = country.value;
  
        for(let item of response.data){
          if (item.iso3 == selectPais){
            pais = item.country;
            ciudades = item.cities;
          }
        };   
        //console.log(ciudades); 
        if (ciudades.length>300){
            for (i=0; i<300;i++){  
                city.innerHTML += `
                            <option value='${i}' selected>${ciudades[i]}</option> 
                            `;
            }
            city.innerHTML += "<option value='continuar' selected>...</option>";
        }else{
            for (i=0; i<ciudades.length;i++){  
                city.innerHTML += `
                            <option value='${i}' selected>${ciudades[i]}</option> 
                            `;
            }
        }
    };
});   
    
    // valida los campos del primer formulario y si está todo correcto crea avatar y pasa al siguiente
    regButton.click(function(e) {

        e.preventDefault();

        var mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var currentDate = new Date();
        
        if(email.val().match(mailFormat)){
        
            if(name.val().length < 5){
                alert("Introduzca su nombre completo");
                name.focus(); //mensaje de error si el nombre tiene menos de 5 carácteres
            } else if(description.val()=="Una breve descripción"){
                alert("Escriba una breve descripción"); //mensaje de error si no se ha cambiado la descripción
                description.focus();
           
            } else {
                //si está todo correcto crea avatar y pasa al siguiente formulario
                alert("Registrado correctamente");
                //console.log(email.val(), name.val(), description.val(), pais, ciudades[city.value]);
                creaAvatar(email.val());
                formulario2();
            }
            
        } else {
                //mensaje si el formato de correo no es válido
                alert("La dirección de correo no es válida");
                email.focus();
            }    
    });
    
    //crea avatar diferente según la dirección de correo que debe ser única para cada usuario
    function creaAvatar(mail){
      // Creamos la variable con la que obtendremos el hash md5
        var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_};

        hash = MD5(mail);
        avatar = "https://www.gravatar.com/avatar/"+hash+"?d=robohash&f=y&s=128";
        //console.log(avatar);
    }
    
    //muestra el avatar creado y el segundo formulario
    function formulario2(){
        var nombre = name.val().split(" ");
        document.getElementById("formulario2").innerHTML = "Hola "+nombre[0]+", este es tu avatar:<br><img src="+avatar+"><br>";
        document.getElementById("formulario2").innerHTML += `
                                                            <div class="form-group anosDexperiencia">
                                                                <label for="anosDexperiencia">Años de experiencia</label>
                                                                <input type="number" class="form-control" id="anosDexperiencia">
                                                            </div>
                                                            <div class="form-group" id="selector">
                                                                <label>Sector</label>
                                                                <select id=sector>
                                                                    <option value='Front-end' selected>Front</option>
                                                                    <option value='Back-end' selected>Back</option>
                                                                    <option value='Mobile' selected>Mobile</option>
                                                                    <option value='Data Science' selected>Data</option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group skillist">
                                                                <label for="skills">Skills</label>
                                                                <input type="text" placeholder="Añade una skill" class="form-control" id="skills">
                                                                <input type='button' class="addbtn" onClick='listar()' Value='Añadir skill' />
                                                                <div id="listaSkills"></div>
                                                            </div>
                                                                <input type="hidden" id="avatar" value="${avatar}">
                                                                <input type="hidden" id="nombre" value="${name.val()}">
                                                                <input type="hidden" id="email" value="${email.val()}">
                                                                <input type="hidden" id="description" value="${description.val()}">
                                                                <input type="hidden" id="pais" value="${pais}">
                                                                <input type="hidden" id="ciudad" value="${ciudades[city.value]}">
                                                            <input type='button' class="btn btn-default" onClick='perfil()' Value='Ver perfil' />
                                                            `;
    }
    
});

//añade una skill más al elemento listaSkills y vacía el input skills
 function listar(){  
        let skill = document.getElementById("skills").value;
        document.getElementById("listaSkills").innerHTML += skill+" ";
        document.getElementById("skills").value = "";
}

//muestra el perfil
function perfil() {
        //variables capturadas de los formularios
        let avatar = document.getElementById("avatar").value;
        let name = document.getElementById("nombre").value;
        let email = document.getElementById("email").value;
        let description = document.getElementById("description").value;
        let pais = document.getElementById("pais").value;
        let ciudad = document.getElementById("ciudad").value;
        let experience = document.getElementById("anosDexperiencia").value;
        let sector = document.getElementById("sector").value;
        let skills = document.getElementById("listaSkills").innerHTML.split(" ");
        //console.log (experience,sector,skills);
     
    //muestra el perfil del usuario creado en formato página web, con el avatar y todos los campos que ha rellenado
    document.getElementById("perfil").innerHTML =`
    <div class="heading">
       <h1>Perfil</h1>
    </div>
            <div class="perfil avatar">
                <label for="avatar">Avatar</label>
                <img id="avatar" src="${avatar}">
            </div>
            <div class="perfil nom">
                <label for="nom">Nombre</label>
                <p id="nom">${name}</p>
            </div>
            <div class="perfil mail">
                <label for="mail">Email</label>
                <p id="mail">${email}</p>
            </div>
            <div class="perfil descripcio">
                <label for="descripcio">Descripción</label>
                <p id="descripcio">${description}</p>
            </div>
            <div class="perfil pais">
                <label for="pais">País</label>
                <p id="pais">${pais}</p>
            </div>
            <div class="perfil ciutat">
                <label for="ciutat">Ciudad</label>
                <p id="ciutat">${ciudad}</p>
            </div>
            <div class="perfil experiencia">
                <label for="expereriencia">Experiencia</label>
                <p id="experiencia">${experience} años</p>
            </div>
            <div class="perfil sector">
                <label for="sector">Sector</label>
                <p id="sector">${sector}</p>
            </div>
            <div class="perfil skills">
                <label for="skills">Skills</label>
                <p id="skills"></p>
            </div>
        `;
    
        //rellena todas las skills guardadas en el array SKILLS
        for(i=0; i<skills.length-1; i++){
            document.getElementById("skills").innerHTML += "- "+skills[i]+"<br>";
        }
    };
        