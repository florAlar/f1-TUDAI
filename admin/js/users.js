document.addEventListener('DOMContentLoaded',()=>{

    window.addEventListener('load', obtenerUsuarios);

    const URLUSUARIOS = 'https://666c911749dbc5d7145e7546.mockapi.io/usuarios';

    let adminListaDeUsuarios = document.querySelector('#adminListaDeUsuarios');
    let formularioAgregarUsuario =document.querySelector('#contenedorFormAdmin');
    formularioAgregarUsuario.addEventListener('submit',agregarUsuario);

    async function obtenerUsuarios() {
        try {
            const response = await fetch(URLUSUARIOS);
            if (!response.ok) {
                throw new Error(`error : ${response.status}`);
            }

            const usuarios = await response.json();
            mostrarUsuarios(usuarios);
            
        } catch (error) {
            console.log(error);
        }
    }

    async function borrarUsuarios(id) {
        try {
            let respuesta = await fetch(`${URLUSUARIOS}/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                console.log('Usuario eliminado: ' + id);
                obtenerUsuarios();
            } else {
                throw new Error(`Error: ${respuesta.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }
    async function agregarUsuario(e) {
        e.preventDefault();

        let formulario = document.querySelector('#contenedorFormAdmin');
        let data = new FormData(formulario);

        let usuario = {
            nombre: data.get('nombre').toLowerCase(),
            apellido: data.get('apellido').toLowerCase(),
            nombreDeUsuario: data.get('nombreDeUsuario').toLowerCase(),
            mail: data.get('mail').toLowerCase(),
            password: data.get('password').toLowerCase(),
            plan: data.get('plan').toLowerCase()
        }

        try {
            let respuesta = await fetch(URLUSUARIOS, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(usuario),
            });

            if (respuesta.ok) {
                console.log('Usuario agregado exitosamente');
            } else {
                console.error('Error al agregar usuario');
            }
        } catch (e) {
            console.error('Error en la solicitud', e);
        }

        obtenerUsuarios();
        formulario.reset();
    }

    function mostrarUsuarios(arreglo) {
        let nuevaListaUsuarios = '';

        for (let i = 0; i < arreglo.length; i++) {
            let usuario = arreglo[i];
            nuevaListaUsuarios += `
                <div class="adminCardUsuario">
                    <div class="flex contenedorCard">
                        <div>
                            <img src="../user/assets/userIcon.png" class="iconMenu">
                        </div>
                        <div class="cardUsuario${usuario.id}">
                            <form id="formModificarUsuario${usuario.id}" class="formularioModificar">
                                <div> Nombre :
                                    <span id='datoNombre' class="italic dato${usuario.id}"> ${usuario.nombre} </span>
                                    <input class="inputMod${usuario.id} oculto" type="text" placeholder="${usuario.nombre}" value="${usuario.nombre}" name="nombre">
                                </div>
                                <div> Apellido : 
                                    <span id='datoApellido' class="italic dato${usuario.id}"> ${usuario.apellido} </span>
                                    <input class="inputMod${usuario.id} oculto" type="text" placeholder="${usuario.apellido}" value="${usuario.apellido}"name="apellido">
                                </div>
                                <div> Nombre de usuario:
                                    <span id='datoNombreDeUsuario' class="italic dato${usuario.id}"> ${usuario.nombreDeUsuario}</span>
                                    <input class="inputMod${usuario.id} oculto" type="text" placeholder="${usuario.nombreDeUsuario}" value="${usuario.nombreDeUsuario}" name="nombreDeUsuario">
                                </div>
                                <div> Contraseña:
                                    <span id='datoPassword' class="italic dato${usuario.id}"> ${usuario.password}</span>
                                    <input class="inputMod${usuario.id} oculto" type="password" placeholder="${usuario.password}" value="${usuario.password}" name="password">
                                </div>
                                <div> mail:
                                    <span id='datoMail' class="italic dato${usuario.id}">${usuario.mail}</span>
                                    <input class="inputMod${usuario.id} oculto" type="mail" placeholder="${usuario.mail}" value="${usuario.mail}" name="mail">
                                </div>
                                <div> Plan Seleccionado:
                                    <span id='datoPlan' class="italic dato${usuario.id}"> ${usuario.plan}</span>
                                    <select class="inputMod${usuario.id} oculto" type="text" placeholder="${usuario.plan}" name="plan">
                                        <option value="premium anual">Suscripcion Premium Anual </option>
                                        <option value="premium mensual">Suscripcion Premium Mensual</option>   
                                        <option value="standard anual">Suscripcion Standard Anual </option>                 
                                        <option value="standard mensual">Suscripcion Standard Mensual </option>                     
                                    </select>
                                </div>
                                <div>Identificador unico: 
                                    <span id='datoID' class="italic ">${usuario.id}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div class="adminButtonGroup">
                        <button class="btnBorrarUsuario botonAdmin" value="${usuario.id}"> borrar usuario </button>
                        <button type='submit'class=" botonAdmin oculto" id="btnSubmitForm${usuario.id}" value="${usuario.id}"> Finalizar </button>
                        <button class="btnModUsuario botonAdmin" id="btnMostrarForm${usuario.id}" value="${usuario.id}"> modificar datos </button>
                    </div>                  
                </div>
                
            `;
            
        }

        adminListaDeUsuarios.innerHTML = nuevaListaUsuarios;

        let botonesBorrar = document.querySelectorAll(".btnBorrarUsuario");
        let botonesModificar = document.querySelectorAll(".btnModUsuario");
        for( let boton of botonesBorrar){
            let idUsuario =boton.getAttribute('value');
            boton.addEventListener('click',()=>{
                borrarUsuarios(idUsuario);
            })
        }        

        for (let boton of botonesModificar) {
            
            let idUsuario = boton.getAttribute('value');
            boton.addEventListener('click', () => { 
                
                modificarUsuarios(idUsuario) });
        }
    }

    async function modificarUsuarios(id) {

        let inputModificarUsuario = document.querySelectorAll(`.inputMod${id}`);
        let datosExistentes = document.querySelectorAll(`.dato${id}`);
        let btnMostrarForm = document.querySelector(`#btnMostrarForm${id}`);
    
        
        for (let dato of datosExistentes) {
            dato.classList.add('oculto');
        }
        for(let input of inputModificarUsuario){
            input.classList.remove('oculto');
        }
    
        
        let nuevoBotonModificar = document.querySelector(`#btnSubmitForm${id}`);
        nuevoBotonModificar.classList.remove('oculto');
        btnMostrarForm.classList.add('oculto');
    
        
        let formularioModificarUsuario = document.querySelector(`#formModificarUsuario${id}`);
    
        
        nuevoBotonModificar.addEventListener('click', async (e) => {
            e.preventDefault();
    
            let datosNuevos = new FormData(formularioModificarUsuario);
    
            let usuarioModificado = {
                nombre: datosNuevos.get('nombre'),
                apellido: datosNuevos.get('apellido'),
                nombreDeUsuario: datosNuevos.get('nombreDeUsuario'),
                mail: datosNuevos.get('mail'),
                password: datosNuevos.get('password'),
                plan: datosNuevos.get('plan')
            };
    
            let respuesta = await fetch(`${URLUSUARIOS}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(usuarioModificado)
            });
    
            if (!respuesta.ok) {
                throw new Error('Error al modificar usuario');
            } else {
                console.log('Usuario modificado correctamente');
                obtenerUsuarios();
            }
        });
    }

})