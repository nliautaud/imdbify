# imdbify

Transform  a file containing [IMDb](http://imdb.com) identifiers like ``tt0654974`` into a *CSV* file similar to the one exported from IMDb, that you can use to feed services asking for an IMDb export file, for example :

  - [icheckmovies](https://icheckmovies.com)
  - Trakt.tv trough [TraktRater](https://github.com/damienhaynes/TraktRater)
  - SensCritique trough [imdb2senscritique](https://github.com/nliautaud/imdb2senscritique)
  - [criticker.com](http://criticker.com)
  - ...

User ratings and dates are recognized when dropping trakt.tv backup files created by [trakt-tv-backup](http://eclectide.com/blog/2014/08/12/trakt-tv-backup).

Movies data is retrieved trough the [OMDb API](http://www.omdbapi.com).

## Usage

Download or open the [the live version](https://rawgit.com/nliautaud/imdbify/master/imdbify.html) and drop a file.

## Example

Input :
```
tt0068646
http://www.imdb.com/title/tt0353969/
tt0050083 http://www.imdb.com/title/tt0081505/
```

Output :

|position|const|created|modified|description|Title|Title type|Directors|You rated|IMDb Rating|Runtime (mins)|Year|Genres|Num. Votes|Release Date (month/day/year)|URL|
|--------|-----|-------|--------|-----------|-----|----------|---------|---------|-----------|--------------|----|------|----------|-----------------------------|---|
|1|tt0068646|Wed&nbsp;Feb&nbsp;22...|||The&nbsp;Godfather|Feature&nbsp;Film|Francis&nbsp;Ford&nbsp;Coppola||9.2|175|1972|Crime,&nbsp;Drama|1209,397|1972-03-24|http://www.imdb.com/title/tt0068646/|
|2|tt0353969|Wed&nbsp;Feb&nbsp;22...|||Memories&nbsp;of&nbsp;Murder|Feature&nbsp;Film|Joon-ho&nbsp;Bong||8.1|132|2003|Crime,&nbsp;Drama,&nbsp;Mystery|72782|2003-05-02|http://www.imdb.com/title/tt0353969/|
|3|tt0050083|Wed&nbsp;Feb&nbsp;22...|||12&nbsp;Angry&nbsp;Men|Feature&nbsp;Film|Sidney&nbsp;Lumet||8.9|96|1957|Crime,&nbsp;Drama|474530|1957-04-01|http://www.imdb.com/title/tt0050083/|
|4|tt0081505|Wed&nbsp;Feb&nbsp;22...|||The&nbsp;Shining|Feature&nbsp;Film|Stanley&nbsp;Kubrick||8.4|146|1980|Drama,&nbsp;Horror|644031|1980-06-13|http://www.imdb.com/title/tt0081505/|



