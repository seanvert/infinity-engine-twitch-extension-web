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


// TODO: consertar o acentos 
var teste = fetchGetAPI('http://127.0.0.1:5000').then((response) => response.body)
  .then((bodyStream) => {
    const reader = bodyStream.getReader();
    return reader.read();
  })
  .then((result) => {
    const bodyContent = new TextDecoder('utf-8').decode(result.value);
    console.log('asd', bodyContent);
    return bodyContent
  })
  .catch((error) => {
    console.error(error);
  });

  var teste2 = fetchGetAPI('http://127.0.0.1:5000')
  .then((response) => response.json())
  .then((json) => {
    console.log('asd', json);
    // Process the JSON data here
  })
  .catch((error) => {
    console.error(error);
  });