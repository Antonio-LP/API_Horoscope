var playlists = [
    {
      "name": "most-viewed",
      "id": "PL15B1E77BB5708555",
      "max": 1150
    },
    {
      "name": "billboard",
      "id": "PL55713C70BA91BD6E",
      "max": 200
    },
    {
      "name": "latest",
      "id": "PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
      "max": 200
    },
    {
      "name": "popular-music-videos",
      "id": "PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
      "max": 200
    },
    {
      "name": "top-hits-this-week",
      "id": "PLw-VjHDlEOgvWPpRBs9FRGgJcKpDimTqf",
      "max": 50
    },
    {
        "name": "Songs-of-2023",
        "id": "PLKUUojYv3TNcKHVVU_rBBXcGEfsd2ITVF",
        "max": 112 
    }
];
let index;
let playlist;

function generateRandom(num) {
    return Math.floor(Math.random() * num);
}

function setPlaylistAndIndex() {
    let loc = generateRandom(playlists.length);
    playlist = playlists[loc];
    index = generateRandom(playlist.max);
}

function setURL() {
    setPlaylistAndIndex();
    return `https://www.youtube.com/embed/?list=${playlist.id}&index=${index}` ;
}

export {setURL}