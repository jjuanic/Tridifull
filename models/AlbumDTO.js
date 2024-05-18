class AlbumDTO {
    constructor(albumId, collectionName, artworkUrl100, artistName, collectionPrice, primaryGenreName) {
        this._albumId = albumId;
        this._collectionName = collectionName;
        this._artworkUrl100 = artworkUrl100;
        this._artistName = artistName;
        this._collectionPrice = collectionPrice;
        this._primaryGenreName = primaryGenreName;
    }

    // Getters
    get albumId() {
        return this._albumId;
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
}

export default AlbumDTO