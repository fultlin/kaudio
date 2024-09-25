import { useEffect, useRef, useState } from "react";
import styles from "./MiniPlayer.module.scss";

export default function MiniPlayer({
  name,
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);

  // Загружаем трек и сбрасываем состояние
  useEffect(() => {
    if (name) {
      const audioElement = playerRef.current;

      audioElement.pause();
      audioElement.src = name;
      audioElement.load();

      // Обновляем продолжительность трека после загрузки метаданных
      audioElement.onloadedmetadata = () => {
        setDuration(audioElement.duration);
      };
    }
  }, [name]);

  // Управляем воспроизведением/паузой
  useEffect(() => {
    const audioElement = playerRef.current;
    if (isPlaying && name) {
      audioElement.play().catch((error) => {
        console.error("Ошибка воспроизведения:", error);
      });
    } else {
      audioElement.pause();
    }
  }, [isPlaying, name]);

  // Обновляем текущее время трека
  useEffect(() => {
    const audioElement = playerRef.current;

    const updateCurrentTime = () => {
      setCurrentTime(audioElement.currentTime);
    };

    // Слушаем событие обновления времени
    audioElement.addEventListener("timeupdate", updateCurrentTime);

    return () => {
      // Очищаем обработчик событий при размонтировании
      audioElement.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, []);

  // Обработчик перемотки трека вручную
  const handleTimeChange = (event) => {
    const audioElement = playerRef.current;
    audioElement.currentTime = event.target.value;
    setCurrentTime(audioElement.currentTime);
  };

  // Управляем изменением громкости
  const handleVolumeChange = (event) => {
    const audioElement = playerRef.current;
    audioElement.volume = event.target.value;
    setVolume(audioElement.volume);
  };

  // Перемотка вперед
  const skipForward = () => {
    const audioElement = playerRef.current;
    audioElement.currentTime += 10;
  };

  // Перемотка назад
  const skipBackward = () => {
    const audioElement = playerRef.current;
    audioElement.currentTime -= 10;
  };

  return (
    <div className={styles.player}>
      <audio id="mini-player" ref={playerRef}></audio>
      <div className={styles.controlButtons}>
        <button onClick={onPrev}>Previous</button>
        <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={onNext}>Next</button>
        <button onClick={skipBackward}>-10</button>
        <button onClick={skipForward}>+10</button>
      </div>

      <div className={styles.timeControls}>
        <span>
          {Math.floor(currentTime / 60)}:
          {Math.floor(currentTime % 60)
            .toString()
            .padStart(2, "0")}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
        />
        <span>
          {Math.floor(duration / 60)}:
          {Math.floor(duration % 60)
            .toString()
            .padStart(2, "0")}
        </span>
      </div>

      <div className={styles.volumeControls}>
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}
