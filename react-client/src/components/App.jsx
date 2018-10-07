import React from 'react';
import axios from 'axios';
import Song from './Song.jsx';
import styles from '../styles/App.css';
import CSSModules from 'react-css-modules';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistID: null,
      albumID: null,
      songID: null,
      popularSongs: [],
      albumCovers: [],
      showMore: false,
      artistObj: null
    };
  }

  componentDidMount() {
    var randNum = Math.floor(Math.random() * 100) + 1;
    this.setState({ artistID: randNum });

    //axios.get(`http://localhost:3003/artist/id`,{params: {id: randNum}})
    axios
      .get(`/artist/` + randNum)
      .then(response => {
        let data = response.data;
        console.log('DATA', data);
        console.log('Albums', data.albums[0]);

        this.setState({ artistObj: data });
        this.setState({ albumCovers: data.albums[0] });

        let albumOne = data.albums[0][0].songs;
        let albumTwo = data.albums[0][1].songs;
        let albumThree = data.albums[0][2].songs;

        albumOne.splice(4);
        albumTwo.splice(3);
        albumThree.splice(3);

        let allAlbumSongs = albumOne.concat(albumTwo, albumThree);

        allAlbumSongs.sort((a, b) => {
          if (a.popularity > b.popularity) return -1;
          if (a.popularity < b.popularity) return 1;
          return 0;
        });

        this.setState({ popularSongs: allAlbumSongs });
      })

      // let albumOne = data.albums[0].songs.map(e => [0, e]);
      // let albumTwo = data.albums[1].songs.map(e => [1, e]);
      // let albumThree = data.albums[2].songs.map(e => [2, e]);
      // let allSongs = albumOne.concat(albumTwo, albumThree);

      // allSongs.sort((a, b) => {
      //   if (a[1].popularity > b[1].popularity) return -1;
      //   if (a[1].popularity < b[1].popularity) return 1;
      //   return 0;
      // });

      .catch(error => {
        console.log(error);
      });
  }

  createListOfSongs() {
    console.log('ALBUM COVERS???', this.state.albumCovers);

    return this.state.popularSongs.map((song, i) => {
      var albumCovers = this.state.albumCovers;
      var songAlbum;

      albumCovers.forEach(album => {
        console.log('LOOOOP ALBUM', album);
        if (song.albumId === album.id) {
          songAlbum = album;
        }
      });

      return (
        <Song
          key={song.id}
          counter={i + 1}
          albumURL={songAlbum.img}
          library={song.library}
          songName={song.name}
          streams={song.streams}
        />
      );
    });
  }

  fiveBestSongs() {
    return this.createListOfSongs().slice(0, 5);
  }

  render() {
    return (
      //<div className={"container-fluid popular-songs"}>
      <div className={'container-fluid'} styleName={'popular-songs'}>
        <div className={'row'}>
          <div className={'col col-lg-1'}>
            <h3 styleName={'popular-title'}>Popular</h3>
          </div>
        </div>

        {this.state.showMore ? this.createListOfSongs() : this.fiveBestSongs()}

        <div className={'row'}>
          <div className={'col col-lg-1'} />
          <div className={'col'}>
            <button
              styleName={'spfy-btn'}
              className={'mt-5'}
              type={'button'}
              onClick={() => {
                this.setState({ showMore: !this.state.showMore });
              }}
            >
              {this.state.showMore ? 'SHOW ONLY 5 SONGS' : 'SHOW 5 MORE'}
            </button>
          </div>
          <div className={'col col-lg-1'} />
        </div>
      </div>
    );
  }
}

//export default App;
export default CSSModules(App, styles);
