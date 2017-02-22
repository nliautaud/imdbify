var dropZone = document.querySelector('.drop-zone');
var htmlOutput = document.querySelector('.htmlOutput');
var progressButton = document.querySelector('.progress-bar.btn');

var processedCount, totalCount, file, data;

function handleDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    dragEnd();

    var reader = new FileReader();
    reader.onload = function(e) {
        dropZone.innerHTML = 'IMDbify...';
        imdbify(e.target.result);
    };
    reader.onerror = function(e) {
        document.body.classList.remove('load');
        dropZone.innerHTML = 'Error reading file, please try again';
    };

    file = evt.dataTransfer.files[0];
    if (!file || !file instanceof Blob) return;

    dropZone.innerHTML = 'Loading file...';
    document.body.classList.add('load');
    reader.readAsText(file);
}

function dragStart(evt) {
    document.body.classList.add('dragover');
    evt.stopPropagation();
    evt.preventDefault();
}

function dragEnd(evt) {
    document.body.classList.remove('dragover');
}

function imdbify(ratings) {
    processedCount = 0;
    data = {};

    try {
        var json = JSON.parse(ratings);
        parseTraktBackupJSON(json);
    } catch (e) {
        parseGeneric(ratings);
    }

    totalCount = Object.keys(data).length;
    updateProgress();
    for (id in data)
        httpGetAsync('https://www.omdbapi.com/?i=' + id, httpCallback);
}

function parseTraktBackupJSON(json) {
    for (var i = 0; i < json.length; i++) {
        var entry = json[i],
            date = entry.rated_at || entry.last_watched_at;
        if (date && entry.movie && entry.movie.ids.imdb)
            data[entry.movie.ids.imdb] = {
                position: i + 1,
                created: moment(new Date(date)).format('ddd MMM D hh:mm:ss YYYY'),
                yourrating: entry.rating
            };
    };
}

function parseGeneric(content) {
    var ids = content.match(/tt\d+/g);
    var pos = 0;

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        if (ids.indexOf(id) != i) continue;
        data[id] = {
            position: ++pos,
            created: moment().format('ddd MMM D hh:mm:ss YYYY'),
            yourrating: ''
        };
    };
}


function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function httpCallback(response) {
    processedCount++;
    updateProgress();

    response = JSON.parse(response);
    if (response.Error) return;

    for (var attr in response)
        data[response.imdbID][attr] = response[attr];

    // we got all the responses, let's finalize
    if (processedCount == totalCount)
        finalize();
}

function updateProgress() {
    progressButton.setAttribute('aria-valuenow', processedCount);
    progressButton.setAttribute('aria-valuemax', totalCount);
    progressButton.style.width = (totalCount / processedCount * 100) + '%';
    progressButton.innerText = processedCount + ' / ' + totalCount;
}

function finalize() {
    var d, runtime, imdbVotes, released, link, entry,
        head = ['position', 'const', 'created', 'modified', 'description', 'Title', 'Title type', 'Directors', 'You rated', 'IMDb Rating', 'Runtime (mins)', 'Year', 'Genres', 'Num. Votes', 'Release Date (month/day/year)', 'URL'],
        csv = '"' + head.join('","') + '"\n',
        htm = '<tr><th>' + head.join('</th><th>') + '</th></tr></thead><tbody>';
    for (id in data) {
        d = data[id];
        runtime = d.Runtime ? d.Runtime.replace(' min', '') : '';
        imdbVotes = d.imdbVotes ? d.imdbVotes.replace(',', '') : '';
        released = d.Released ? moment(new Date(d.Released)).format('YYYY-MM-DD') : '';
        link = 'http://www.imdb.com/title/' + id + '/';
        entry = [
            d.position, id, d.created, '', '', d.Title, 'Feature Film', d.Director, d.yourrating,
            d.imdbRating, runtime, d.Year, d.Genre, imdbVotes, released, link
        ];
        csv += '"' + entry.join('","') + '"\n';
        entry[15] = '<a href="' + entry[15] + '">' + entry[15] + '</a>';
        htm += '<tr><td>' + entry.join('</td><td>') + '</td></tr>';
    };

    dropZone.innerHTML = 'Done.';

    progressButton.href = 'data:application/octet-stream,' + encodeURIComponent(csv);
    progressButton.innerText = 'Download ' + file.name + '.csv';
    progressButton.setAttribute('download', file.name + '.csv');

    htmlOutput.innerHTML = '<table class="table table-striped table-bordered"><thead class="thead-default">' + htm + '</tbody></table>';
}


document.body.addEventListener('dragover', dragStart, false);
document.body.addEventListener('dragleave', dragEnd, false);
document.body.addEventListener('drop', handleDrop, false);
