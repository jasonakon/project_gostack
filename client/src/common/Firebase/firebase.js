import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login(email,password){
        return this.auth.signInWithEmailAndPassword(email,password);
    }

    logout() {
        return this.auth.signOut();
    }

    async register(name, email, password){
        await this.auth.createUserWithEmailAndPassword(email,password);
        return this.auth.currentUser.updateProfile({
            displayName:name 
        })
    }

    addQuote(quote){
        if(!this.auth.currentUser){
            return alert('Not authorized')
        }
        
		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
    }

    isInitialized(){
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }

    getCurrentUserName() {
        // this.auth.onAuthStateChanged((users) => {
        //     if (users){
        //     console.log(this.auth.currentUser.displayName)
             return this.auth.currentUser && this.auth.currentUser.displayName
        //     //console.log(this.auth.currentUser.displayName)
        //     //return users.displayName
        //     } else {
        //         return null
        //     }
        // })
        //console.log(this.auth.currentUser)
        //return 11
    }

    // async getCurrentUserName() {
	// 	const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
	// 	return quote.get('quote')
    // }
}

export default new Firebase()
//export default Firebase;