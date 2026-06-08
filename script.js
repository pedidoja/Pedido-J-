console.log("Script carregado!");

const firebaseConfig = {
    apiKey: "AIzaSyD0d9bz8FcTSW8dJYOeQoEMs6hsh1yoEOE",
    authDomain: "pedidoja-695c3.firebaseapp.com",
    projectId: "pedidoja-695c3",
    storageBucket: "pedidoja-695c3.firebasestorage.app",
    messagingSenderId: "621377263633",
    appId: "1:621377263633:web:eec3f0e66eb6a89daa79b0"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    console.error("Erro Firebase:", error);
}

const auth = firebase.auth();

document.getElementById('btnEntrar').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    
    auth.signInWithEmailAndPassword(email, senha)
        .then(() => {
            console.log("Login OK!");
            // Comando forçado de redirecionamento
            window.location.assign("index.html");
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
});