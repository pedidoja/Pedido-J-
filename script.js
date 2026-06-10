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
const db = firebase.firestore();

// Função de verificação de status
async function verificarStatusEmpresa(uid) {
    try {
        console.log("Tentando buscar usuário com UID:", uid);
        const userDoc = await db.collection("usuarios").doc(uid).get();
        
        if (!userDoc.exists) {
            console.log("Erro: Documento do usuário não encontrado no banco!");
            return null;
        }

        const empresaId = userDoc.data().empresa_id;
        console.log("ID da empresa encontrada no usuário:", empresaId);
        
        const empresaDoc = await db.collection("empresas").doc(empresaId).get();
        
        if (!empresaDoc.exists) {
            console.log("Erro: Documento da empresa não encontrado com o ID:", empresaId);
            return null;
        }

        const status = empresaDoc.data().status;
        console.log("Status encontrado na empresa:", status);
        return status;
        
    } catch (error) {
        console.error("Erro crítico ao verificar status:", error);
        return null;
    }
}

document.getElementById('btnEntrar').addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    
    auth.signInWithEmailAndPassword(email, senha)
        .then(async (userCredential) => {
            console.log("Login OK!");
            
            const status = await verificarStatusEmpresa(userCredential.user.uid);
            console.log("Resultado final da verificação:", status);
            
            if (status === "ativo") {
                window.location.assign("index.html");
            } else {
                alert("Acesso negado: Sua assinatura não está ativa ou não foi encontrada.");
                auth.signOut();
            }
        })
        .catch((error) => {
            alert("Erro: " + error.message);
        });
});