import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    // Estado: token y datos del usuario actual
    const token = ref(localStorage.getItem('token') || null);
    const userData = ref(localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null);
    
    // Estado: datos del formulario de registro
    const registro = ref({
        usuario: '',
        email: '',
        password: '',
    });
    
    // Estado: datos del formulario de login
    const login = ref({
        username: '',
        password: '',
    });

    // Estado: BASE DE DATOS LOCAL de usuarios registrados
    const usuariosRegistrados = ref<Array<{
        usuario: string;
        email: string;
        password: string;
        fechaRegistro: string;
    }>>([]);

    // Cargar usuarios guardados al iniciar
    const usuariosGuardados = localStorage.getItem('usuarios');
    if (usuariosGuardados) {
        usuariosRegistrados.value = JSON.parse(usuariosGuardados);
    }

    // Función para guardar la sesión
    function $setLogin(data: any | null) {
        if (data) {
            token.value = data.token;
            localStorage.setItem('token', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));
            userData.value = data.user;
        } else {
            token.value = null;
            userData.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
        }
    }

    // Función de LOGIN local
    function $login() {
        return new Promise((resolve, reject) => {
            // Buscar el usuario en la lista de registrados
            const usuario = usuariosRegistrados.value.find(
                u => u.email === login.value.username || u.usuario === login.value.username
            );
            
            if (usuario && usuario.password === login.value.password) {
                // Login exitoso
                const fakeResponse = {
                    token: 'fake-token-' + Date.now(),
                    user: {
                        usuario: usuario.usuario,
                        email: usuario.email,
                        id: Date.now()
                    }
                };
                $setLogin(fakeResponse);
                resolve(fakeResponse);
            } else {
                // Login fallido
                reject({ 
                    response: { 
                        data: { message: 'Credenciales inválidas' } 
                    } 
                });
            }
        });
    }

    // Función de REGISTRO local
    function $registro() {
        return new Promise((resolve, reject) => {
            // Verificar si el email ya está registrado
            const existe = usuariosRegistrados.value.find(u => u.email === registro.value.email);
            
            if (existe) {
                reject({ 
                    response: { 
                        data: { message: 'El email ya está registrado' } 
                    } 
                });
                return;
            }

            // Crear nuevo usuario
            const nuevoUsuario = {
                usuario: registro.value.usuario,
                email: registro.value.email,
                password: registro.value.password,
                fechaRegistro: new Date().toISOString()
            };

            // Agregar a la lista
            usuariosRegistrados.value.push(nuevoUsuario);
            
            // Guardar en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados.value));

            // Simular respuesta exitosa de API
            const fakeResponse = {
                token: 'fake-token-' + Date.now(),
                user: {
                    usuario: nuevoUsuario.usuario,
                    email: nuevoUsuario.email,
                    id: Date.now()
                }
            };
            
            $setLogin(fakeResponse);
            resolve(fakeResponse);
        });
    }

    // Función para ver todos los usuarios registrados (útil para depuración)
    function $getUsuarios() {
        return usuariosRegistrados.value;
    }

    return { 
        registro, 
        login, 
        $login, 
        token, 
        $setLogin, 
        userData, 
        $registro,
        $getUsuarios 
    };
});