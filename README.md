# Formulario para MWC 22 Front-End Hackaton

Formulario para registrar un profesional del sector tecnológico creado para la Hackaton del 4YFN – MWC Barcelona 2022

> Breve descripción del proyecto: 

 Plataforma que permite rellenar tus campos personales y profesionales y generar una vista que te ayuda a posicionarte entre empresas y otros profesionales del sector.


## Background 

Teniendo en cuenta que el MWC es un escaparáte de empresas y talento, que mejor ocasión para desarrollar un plataforma que permita rellenar tus campos personales y profesionales y generar una vista que te ayude a posicionarte entre empresas y otras profesionales del sector.

Ponte en el papel de que el Barcelona Digital Talent te ha contratado para desarrollar la web anterior. Puedes utilizar la tecnología que creas más conveniente siempre que se cumplas los puntos comentados en las user stories:


## Usage

Hay un archivo JavaScript que sirve para validar los formularios y crear las siguientes páginas de forma dinámica: srcript.js 

Primero, valida los campos del primer formulario al dar al botón Registrarse, después si está todo correcto crea un avatar diferente para cada usuario según su email y muestra el segundo formulario. Finalmente, si se hace click en el botón Ver Perfil muestra el Perfil de usuario con su avatar y todos los campos que ha rellenado.


## API/Component

Se ha utilizado dos APIs: 
- Countriesnow (https://countriesnow.space/), para obtener la lista de los paises y las ciudades. 
- Gravatar (https://www.gravatar.com/), para crear un avatar gracias al hash MD5 obtenido de la dirección de correo del usuario.

Se ha hecho un GET con AJAX a https://countriesnow.space/api/v0.1/countries, que es la página que muestra las ciudades de cada país y rellena tanto el select de país como el de ciudad al seleccionar país. 
Para el avatar se hace un hash MD5 a la dirección de email que ha introducido el usuario y se rellena con él la siguiente dirección "https://www.gravatar.com/avatar/[HashMD5delEmail]?d=robohash&f=y&s=128", que al ser cada una diferente, se obtiene un avatar distinto para cada usuario.


## Installation

No necesita instalación ya que no se ha utilizado ningún framework al no creerlo necesario.


## Stack

[HTML5](http://www.w3.org/TR/html5/)
[CSS3](http://www.w3.org/TR/CSS/)
[BOOTSTRAP](http://getbootstrap.com/)
[JAVASCRIPT](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


## Roadmap and visuals

Se ha utilizado un diseño muy minimalista aprovechando parte del trabajo que ya había realizado para la Hackaton del Jump2Digital. Los avatares con aspecto de robot se han escogido porque fueron los que más me llamaron la atención dentro de las opciones de Gravatar, además que al tratarse del sector tecnológico pensé que encajaban bastante.


## Contribución y Apoyo 

Cualquiera lo puede utilizar si le apetece. 


## Contact info 

victor.espada@iesjoandaustria.org


## License 

[MIT](https://opensource.org/licenses/MIT)

