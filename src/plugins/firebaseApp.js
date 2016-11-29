import firebase from 'firebase';

var FirebasePlugin = {
	init: function(config) {
		if(firebase.apps.length===0)
			firebase.initializeApp(config);
		
		return firebase;
	},
	db: function() {
		let fb = firebase;
		return fb.database();
	},
	auth: function(){
		let fb = firebase;
		return fb.auth();
	},
	providerG: function(){
		var provider = new firebase.auth.GoogleAuthProvider();
		return provider;
	}
}

export default function(Vue) {
	Vue.firebaseAPP = FirebasePlugin;

	Object.defineProperties(Vue.prototype, {
		$firebaseApp: {
			get: function() {
				return Vue.firebaseAPP;
			}
		}
	})
}