# imdbify

Transform  a file containing [IMDb](http://imdb.com) identifiers like ``tt0654974`` into a *CSV* file similar to the one exported from IMDb, that you can use to feed services asking for an IMDb export file, for example :

  - [icheckmovies](https://icheckmovies.com)
  - Trakt.tv trough [TraktRater](https://github.com/damienhaynes/TraktRater)
  - SensCritique trough [imdb2senscritique](https://github.com/nliautaud/imdb2senscritique)
  - [criticker.com](http://criticker.com)

User ratings and dates are recognized when dropping trakt.tv backup files created by [trakt-tv-backup](http://eclectide.com/blog/2014/08/12/trakt-tv-backup).

Movies data is retrieved trough the [OMDb API](http://www.omdbapi.com).

## Usage

Download or open the [the live version](https://rawgit.com/nliautaud/imdbify/master/imdbify.html) and drop a file.
