// function that will load when video_overlay.html loads

function video_overlay_loaded() {
    // get body
    var body = document.getElementsByTagName('body')[0];
    // add class to body
    body.classList.add('video_overlay_loaded');
    // display message on console saying that script is loaded
    console.log('video_overlay_loaded');

}

video_overlay_loaded();

// mock characters api response

const characters = fetchGetAPI('http://127.0.0.1:5000').then((response) => response.body)
.then((bodyStream) => {
  const reader = bodyStream.getReader();
  return reader.read();
})
.then((result) => {
  const bodyContent = new TextDecoder('utf-8').decode(result.value);
  return bodyContent
})
.catch((error) => {
  console.error(error);
});



// access the api endpoint and gets a json with the characters that will be rendered into the element
async function get_characters() {
    // get the element with id "characters"
    var characters = document.getElementById('characters');
    // get the characters from the api endpoint
    var response = await fetch('http://127.0.0.1:5000');
    // get the json from the response
    var data = await response.json();
    // get the characters from the json
    const characters_list = await JSON.parse(data.characters);
    // loop through the characters and render them into the element
    for (let i = 0; i < characters_list.length; i++) {
        // get the character from the list
        const character = characters_list[i];
        // render the character into the element
        const portrait = character.creature.small_portrait.replace(/\u0000/g, '');;
        characters.innerHTML += `
        <div class="character_card tooltip">
            <img src="./assets/img/${portrait}.bmp" alt="${character.member.character_name}">
            <span class="tooltiptext"><h3>${character.member.character_name}</h3></span>
        </div>
        `;
    }
}

get_characters();

async function fetchGetAPI (url) {
    /*
        documentation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
        fetch api: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    */
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
	}).catch(function (error) {
		console.log(error);
	});
    

    return response
};