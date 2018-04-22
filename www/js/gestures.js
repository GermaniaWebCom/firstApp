// @ JavaScript Document

var app={
	inicio:function(){
		this.iniciaBotones();
		this.inicaFastClick();
		this.iniciaHammer();
	},
	
	inicaFastClick: function(){
		FastClick.attach(document.body);
	},
	
	iniciaBotones: function(){
		var botonClaro= document.querySelector('#claro');
		var botonOscuro= document.querySelector('#oscuro');
		
		botonClaro.addEventListener("click", this.ponloClaro, false);
		botonOscuro.addEventListener("click", this.ponloOscuro, false);
	},
	
	iniciaHammer: function(){
		
		var zona = document.getElementById('zona-gestos'); // le decimos a Hammer sobre que 
															//zona va a actuar de forma similar al o que hacíamos con attach.
		var hammertime = new Hammer(zona) ; //inicializamos una nueva instancia de Hammer.
		
		hammertime.get('pinch').set({enable: true});// habilitamos evento pinch en la librería hammer
		hammertime.get('rotate').set({enable: true}); // habilitamos evento rotate en la librería hammer.
		
		//Ahora que tenemos estos dos eventos también habilitados le decimos que va a pasar cuando ocurran
		//hammertime.on('tap doubletap pan swipe press pinch rotate', function(ev){ //declaramos los eventos que va a recoger
		//es interesante ver que nos permite asociar muchos eventos sin necesidad de comas.
		//	document.querySelector('#info').innerHTML = ev.type + '!';
		
			zona.addEventListener('webkitAnimationEnd', function(e){ //esto detecta el final de la animación
			// y recién entonces remueve la clase agregada a zona-gestos para poder realizar la animación otra vez.
				zona.className = '';
			});
			
			hammertime.on('tap', function(ev){
				zona.className = 'tap';
		
		});
			
			hammertime.on('doubletap', function(ev){
				zona.className = 'doubletap';
		
		});
		
		hammertime.on('press', function(ev){
				zona.className = 'press';
		
		});
		
		//Estas animaciones son un poco más complejas.
		
		hammertime.on('swipe', function(ev){
			var clase = undefined;
			direccion = ev.direction;
			
			if(direccion == 4) clase = "swipe-derecha";
			if(direccion == 2) clase = "swipe-izquierda";
			
			zona.className = clase;
		});
		
		hammertime.on('rotate', function(ev){
			var umbral = 25; // esta variable mide el desplazamiento antes de disparar la animación.
			if(ev.distance > umbral) zona.className = "rotate";
		});
	},
	
	
	/* Funciones de la primera clase que reestructuramos */
	
	ponloClaro: function(){
		document.body.className = 'claro';
	},
	
	ponloOscuro: function(){
		document.body.className = 'oscuro';
	},
	
};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
		app.inicio();		
	}, false);
}



