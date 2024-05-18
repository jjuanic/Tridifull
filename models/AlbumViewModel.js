class AlbumViewModel {
    constructor(collectionId, collectionName, artworkUrl100, artistName, collectionPrice, primaryGenreName) {
        this.collectionId = collectionId;
        this._collectionName = collectionName;
        this._artworkUrl100 = artworkUrl100;
        this._artistName = artistName;
        this._collectionPrice = collectionPrice;
        this._primaryGenreName = primaryGenreName;
    }

    // Getters
    get collectionId() {
        return this._collectionId;
    }

    get collectionName() {
        return this._collectionName;
    }

    get artworkUrl100() {
        return this._artworkUrl100;
    }

    get artistName() {
        return this._artistName;
    }

    get collectionPrice() {
        return this._collectionPrice;
    }

    get primaryGenreName() {
        return this._primaryGenreName;
    }

    // Setters
    set collectionId(newCollectionId) {
        this._collectionId = newCollectionId;
    }
}

const mapAlbumDataToViewModel = (data) => {
    return new AlbumViewModel(
        data.idAlbum,            // map idAlbum to collectionId
        data.collectionName,     // map collectionName
        data.artworkUrl100,      // map artworkUrl100
        data.artistName,         // map artistName
        data.collectionPrice,    // map collectionPrice
        data.primaryGenreName    // map primaryGenreName
    );
};

export 
{ AlbumViewModel,
  mapAlbumDataToViewModel
}
