const url = './api/login.php';

const formLogin = document.getElementById("form-login");
const divLogout = document.getElementById("div-logout");
const textoLogueado = document.getElementById("texto-logueado");
const divLogin = document.getElementById("div-login");
const btnLogout = document.getElementById("btn-logout");
const inputUsuario = document.getElementById("usuario");
const inputPassword = document.getElementById("password");

let usuario = '';
let logueado = false;

document.addEventListener("DOMContentLoaded", () => {
    verificar();
  });

const verificar = () => {
    if (sessionStorage.getItem("usuario")) {
        usuario = sessionStorage.getItem("usuario");
        textoLogueado.innerHTML = `Bienvenido ${usuario}`;
        logueado = true;
      }
    if(logueado) {
        divLogout.style.display = "inline";
        divLogin.style.display = "none"; 
    } else {
        divLogout.style.display = "none";
        divLogin.style.display = "inline";
    }
}

const login = (datos) => {
fetch(url, {
            method: 'POST',
            body: datos
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data[0].usuario) {
                usuario = data[0].usuario;
                logueado = true;
                sessionStorage.setItem('usuario',usuario);
                verificar();             
                //window.location.href = './articulos.html';
            } else {
                textoLogueado.innerHTML = `${data}`;
            }
            inputUsuario.value = '';
            inputPassword.value = '';
        });
        window.location.reload();
}

const logout = () => {
    logueado = false;
    textoLogueado.innerHTML = '';
    sessionStorage.removeItem('usuario');
    verificar();
    window.location.reload();
}

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = new FormData(formLogin);
    login(datos);
})

btnLogout.addEventListener('click', () => {
    logout();
})