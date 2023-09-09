function onAuth(uid) {
    const element = document.createElement('div');
    element.innerHTML = 'Twitch onAuthorized called with UID: ' + uid;
    element.classList.add('hello');
    return element;
}

document.addEventListener('DOMContentLoaded', function () {
    Twitch.ext.onAuthorized(function(auth) {
        let tuid = auth.userId;
        document.body.appendChild(onAuth(tuid))
    });
});

async function fetchGetAPI (url) {

	const headersreq = {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
					//	'Upgrade-Insecure-Requests': '1',
                    };
	var response = await fetch(url, {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: headersreq,
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
    return response
};

