const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('https://gist.githubusercontent.com/bradtraversy/20dee7787486d10db3bd1f55fae5fdf4/raw/2c06c44dcea55ecbb6fbf20edfd240ec6373b688/state_capitals.json');
    const states = await res.json();

    //make filter state
    let matches = states.filter( state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        if(!state.name.match(regex)){
            return matchList.innerHTML = '';
        }
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if(searchText.length === 0){
        matches=[];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
}

//Show result in HTml
const outputHtml = (matches) => {
    if(matches.length > 0) {
        const state = matches.map( match => 
            `<div class = "card card-body mb-1">
                <h4>${match.name} (${match.abbr})
                    <span class="text-primary">${match.capital}</span>
                </h4>
                <small>Lat: ${match.lat}/ Long: ${match.long}</small>
            </div>`
        ).join('');

        matchList.innerHTML=state;
    }
}

search.addEventListener('input', () => searchStates(search.value));