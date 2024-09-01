import { observer } from "mobx-react-lite";
import MiniPlayer from "../MiniPlayer/component";
import { Link } from "react-router-dom";
import Search from "../Search/component";
import homeStore from "stores/homeStore";
import { toJS } from "mobx";
import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import UploadIcon from "./components/UploadIcon";

const Home = observer(() => {
  const [allTracks, setAllTracks] = useState([]);
  const [src, setSrc] = useState("");
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const tracks = toJS(homeStore.music) || [];

  useEffect(() => {
    if (
      Array.isArray(tracks) &&
      JSON.stringify(tracks) !== JSON.stringify(allTracks)
    ) {
      setAllTracks(tracks);
      console.log(tracks);
    }
  }, [tracks]);

  useEffect(() => {
    if (allTracks.length > 0) {
      loadAndPlayTrack(currentTrackIndex);
    }
  }, [currentTrackIndex, allTracks]);

  const loadAndPlayTrack = async (index) => {
    const track = allTracks[index];
    if (track) {
      const url = await homeStore.loadAndPlayMusic(track.name);
      setSrc(url);
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : allTracks.length - 1;
    });
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => {
      return prevIndex < allTracks.length - 1 ? prevIndex + 1 : 0;
    });
  };

  return (
    <div>
      <div className={styles.upper__home}>
        <Link to="upload">
          <UploadIcon />
        </Link>
        <Search />
      </div>
      <ul className={styles.track__list}>
        {Array.isArray(allTracks) && allTracks.length > 0 ? (
          allTracks.map((track, index) => (
            <li
              key={track.id}
              onClick={() => setCurrentTrackIndex(index)}
              className={styles.track}
            >
              <div>{track.id}</div>
              <div>
                <span className={styles.track__information__name}>
                  {track.name.slice(0, -4)}
                </span>
                <span className={styles.track__information__author}>
                  {track.author}
                </span>
              </div>
            </li>
          ))
        ) : (
          <div>No tracks available</div>
        )}
      </ul>
      <MiniPlayer
        name={src}
        onPrev={handlePrevTrack}
        onNext={handleNextTrack}
      />
    </div>
  );
});

export default Home;
