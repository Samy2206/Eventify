const serviceAccount = require('../serviceAccountKey.json')
const admin = require('firebase-admin')
const initializeApp = async ()=>{
    
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase initialized")
}

module.exports = initializeApp