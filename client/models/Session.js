app.factory('Session', function (Collections) {
	var session;
	return {
		setSession: function (aSession) {
			session = aSession;
		},
		getSession: function () {
			console.log("Called get session")
			if (session) {
				console.log("Session found, returning session")
				return session;
			}
			else {
				console.log("No session found")
				return false;
			}
		}
	}
})