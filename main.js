//Creo la clase Persona
class Persona {
    constructor(nombre, apellidos, num_identificacion, estado_civil) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.num_identificacion = num_identificacion;
        this.estado_civil = estado_civil;
    } 
    //Al final cree esta funcion debido a que no me terminaba de mostrar la informacion de las personas que se habian subido
    imprimirInformacion() {
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Apellidos: ${this.apellidos}`);
        console.log(`Numero de identificacion: ${this.num_identificacion}`);
        console.log(`Estado civil: ${this.estado_civil}`);
    }  

}

//Creo la clase estudiante que hereda atributos de la clase persona
class Estudiante extends Persona {
    constructor(nombre, apellidos, num_identificacion, estado_civil, curso) {
        super(nombre, apellidos, num_identificacion, estado_civil);
        this.curso = curso;
    }
}

//Igual que con el caso de la clase Estudiante
class Empleado extends Persona {
    constructor(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho) {
        super(nombre, apellidos, num_identificacion, estado_civil);
        this.año_incorporacion = año_incorporacion;
        this.num_despacho = num_despacho;
    }

}

//Creo la clase Profesor y heredo los atributos de la clase empleado(que está heredando los atributos de la clase persona)
class Profesor extends Empleado {
    constructor(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho, departamento) {
        super(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho);
        this.departamento = departamento;
    }

}

//Mismo caso que con la clase Profesor
class PersonalServicio extends Empleado {
    constructor(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho, seccion) {
        super(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho);
        this.seccion = seccion;
    }

}


class CentroEducativo {
    constructor() {
        this.personas = [];
    }

    //Estoy creando el método para dar de alta a una persona
    darDeAlta(persona) {
        this.personas.push(persona);
        console.log(`Hemos registrado a ${persona.nombre} ${persona.apellidos}`);
        console.log("")
    }

    //Estoy creando el método para dar de baja a una persona, si la persona tiene el mismo num de identificacoin, es eliminarlo
    darDeBaja(num_identificacion) {
        const index = this.personas.findIndex(persona => persona.num_identificacion === num_identificacion);
        if (index !== -1) {
            const personaEliminada = this.personas.splice(index, 1)[0];
            console.log(`Hemos eliminado a ${personaEliminada.nombre} ${personaEliminada.apellidos}`);
        } else {
            console.log(`No se encontro ninguna persona con el numero de identificacion: ${num_identificacion}.`);
        }
    }

    //Con este metodo puedo mostrar a las personas alfabeticamente segun el apellido
    ordenarPorApellido() {
        this.personas.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
    }

    filtrarPorTipo(tipo) {
        return this.personas.filter(persona => persona instanceof tipo);
    }
    
    //Quiero obtener los datos con un prompt
    obtenerTipoPersona() {
        return prompt("Ingrese el tipo de persona que desea buscar (estudiante, profesor o personal de servicio):").toLowerCase();
    }

    buscarPorTipoImprimirInformacion() {
        const tipo = this.obtenerTipoPersona();
        const tipoClase = tipo.charAt(0).toUpperCase() + tipo.slice(1); //Estoy convirtiendo el tipo en nombre de clase
        const personas = this.filtrarPorTipo(eval(tipoClase)); //Segun lo que busque, el eval me va a dar la clase correspondiente
        if (personas.length > 0) {
            console.log(`Informacion de personas de ese tipo ${tipo}:`);
            personas.forEach(persona => {
                persona.imprimirInformacion();
                console.log("--------------------------------------------");
            });
        } else {
            console.log(`No hemos encontrado informacion del tipo ${tipo}`);
        }
    }
    
    
    //Con este metodo estoy buscando a la persona por el tipo de informacion y, al encontrarla, muestra su info con imprimirInformacion, de lo contrario mustra que no se encontró a nadie con ese numero
    buscarPorNumIdentificacion(num_identificacion) {
        const index = this.personas.findIndex(persona => persona.num_identificacion === num_identificacion);
        if (index !== -1) {
            const personaEncontrada = this.personas[index];
            console.log(`Información de la persona con el número de identificación ${num_identificacion}:`);
            personaEncontrada.imprimirInformacion();
        } else {
            console.log(`No se encontró ninguna persona con el número de identificación: ${num_identificacion}.`);
        }
    }
    obtenerNumIdentificacion() {
        return prompt("Ingrese el número de identificación de la persona que desea buscar:");
    }

    imprimirInformacion2() {
        const opcion = obtenerRespuesta(
            "Seleccione una opcion:\n" +
            "1- Mostrar alfabeticamente\n" +
            "2- Mostrar por ocupacion\n" +
            "3- Mostrar por numero de identificacion\n" +
            "4- Salir"
        );
    
        switch (opcion) {
            case "1":
                this.ordenarPorApellido();
                this.imprimirInformacion();
                break;
            case "2":
                this.buscarPorTipoImprimirInformacion();
                break;
            case "3":
                const num_identificacion = this.obtenerNumIdentificacion();
                this.buscarPorNumIdentificacion(num_identificacion);
                break;
            case "4":
                menuPrincipal();
                break;
            default:
                mostrarMensaje("Opción no válida.");
                this.imprimirInformacion2(); // Si la opción no es válida, mostrar nuevamente las opciones
        }
    }
    //Creo un metodo para mostrar la informacion en el console log
    imprimirInformacion() {
        console.log("Informacion de las personas registradas:");
        this.personas.forEach(persona => {
            persona.imprimirInformacion();
            console.log("--------------------------------------------");
        });
    }

    
}


//Con esta funcion puedo obtener la respuesta(las opciones que le doy) del usuario o administrador que maneja los datos
function obtenerRespuesta(mensaje) {
    return prompt(mensaje);
}

//Con esta funcion le voy mostrando los mensajes al  usuario
function mostrarMensaje(mensaje) {
    alert(mensaje);
}

//Estoy creando una instancia de centro educativo
const centroEducativo = new CentroEducativo();

//Le muestro al usuario las posibilidades que tiene
function menuPrincipal() {
    const opcion = obtenerRespuesta(
        "Bienvenido\n" +
        "Seleccione una opcion:\n" +
        "1- Dar de alta a una persona\n" +
        "2- Dar de baja a una persona\n" +
        "3- Listado de las personas\n" +
        "4- Salir"
    );

    switch (opcion) {//Creo un switch para que le sea mas simple al administrador de elegir las opciones
        case "1":
            darDeAlta();
            break;
        case "2":
            darDeBaja();
            break;
        case "3":
            listarInformacion();
            break;
        case "4":
            mostrarMensaje("Gracias por usar nuestro servicio!");
            break;
        default:
            mostrarMensaje("Error, seleccione una de las opciones que le ofrecemos.");
            menuPrincipal();
    }
}

//Estoy creando una funcion para dar de alta a las personas
function darDeAlta() {
    const tipoPersona = obtenerRespuesta(
        "Seleccione el tipo de persona:\n" +
        "1- Estudiante\n" +
        "2- Profesor\n" +
        "3- Personal de Servicio"
    );

    let persona;
    switch (tipoPersona) {//vuelvo a hacer la tecnica de arriba
        case "1":
            persona = crearEstudiante();//creo las personas segun su rol en el lugar educativo
            break;
        case "2":
            persona = crearProfesor();
            break;
        case "3":
            persona = crearPersonalServicio();
            break;
        default:
            mostrarMensaje("Ingresó un valor incorrecto.");
            menuPrincipal();
            return;
    }

    centroEducativo.darDeAlta(persona);
    mostrarMensaje(`${persona.nombre} ${persona.apellidos} se ha subido correctamente.`);
    menuPrincipal();
}

//Creo la funcion para recibir los parametros y crear un estudiante
function crearEstudiante() {
    const nombre = obtenerRespuesta("Ingrese el nombre del estudiante");
    const apellidos = obtenerRespuesta("Ingrese los apellidos del estudiante");
    const num_identificacion = obtenerRespuesta("Ingrese el numero de identificacion del estudiante");
    const estado_civil = obtenerRespuesta("Ingrese el estado civil del estudiante");
    const curso = obtenerRespuesta("Ingrese el curso del estudiante");
    return new Estudiante(nombre, apellidos, num_identificacion, estado_civil, curso);
}

//Creo la funcion para recibir los parametros y crear un profesor
function crearProfesor() {
    const nombre = obtenerRespuesta("Ingrese el nombre del profesor");
    const apellidos = obtenerRespuesta("Ingrese los apellidos del profesor");
    const num_identificacion = obtenerRespuesta("Ingrese el numero de identificacion del profesor");
    const estado_civil = obtenerRespuesta("Ingrese el estado civil del profesor");
    const año_incorporacion = obtenerRespuesta("Ingrese el año de incorporacion del profesor");
    const num_despacho = obtenerRespuesta("Ingrese el numero de despacho del profesor");
    const departamento = obtenerRespuesta("Ingrese el departamento del profesor");
    return new Profesor(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho, departamento);
}

//Creo la funcion para recibir los parametros y crear un personal servicio
function crearPersonalServicio() {
    const nombre = obtenerRespuesta("Ingrese el nombre del personal de servicio");
    const apellidos = obtenerRespuesta("Ingrese los apellidos del personal de servicio");
    const num_identificacion = obtenerRespuesta("Ingrese el numero de identificacion del personal de servicio");
    const estado_civil = obtenerRespuesta("Ingrese el estado civil del personal de servicio");
    const año_incorporacion = obtenerRespuesta("Ingrese el año de incorporacion del personal de servicio");
    const num_despacho = obtenerRespuesta("Ingrese el numero de despacho del personal de servicio");
    const seccion = obtenerRespuesta("Ingrese la seccion asignada del personal de servicio");
    return new PersonalServicio(nombre, apellidos, num_identificacion, estado_civil, año_incorporacion, num_despacho, seccion);
}

//Funcion para dar de baja a una persona(se devuelve a el metodo de dar de baja)
function darDeBaja() {
    const num_identificacion = obtenerRespuesta("Ingrese el numero de identificacion de la persona que quiere dar de baja:");
    centroEducativo.darDeBaja(num_identificacion);
    menuPrincipal();
}

//En este caso tambien vuelve a el metodo de arriba imprimirinformacion
function listarInformacion() {
    centroEducativo.imprimirInformacion2();
    menuPrincipal();
}

//Vuelve a iniciar mostrando el menu
menuPrincipal();