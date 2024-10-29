import React, { useRef, useState } from "react";

function App() {
  const audioRef = useRef(null)
  const arrayMusic = ['zabud', 'ameli', 'blindzone']
  const [trackIndex, setTrackIndex] = useState({
    index: 0
  })

  const play = () => {
    audioRef.current.play()
  }

  const pause = () => {
    audioRef.current.pause()
  }

  const nextTrack = () => {
    const copyState = { ...trackIndex }
    if (copyState.index >= arrayMusic.length - 1) {
      copyState.index = 0
    } else {
      copyState.index++
    }
    setTrackIndex(copyState)
  }

  const prevTrack = () => {
    const copyState = { ...trackIndex }
    if (copyState.index <= 0) {
      copyState.index = arrayMusic.length - 1
    } else {
      copyState.index--
    }
    setTrackIndex(copyState)
  }

  return (
    <div className="App">

      <audio
        ref={audioRef}
        style={{ 'display': 'none' }}
        src={`./music/${arrayMusic[trackIndex.index]}.mp3`}>
      </audio>
      <a download={'myMusic'} href={`./music/${arrayMusic[trackIndex.index]}.mp3`}>Скачать</a>
      <button onClick={prevTrack}>PREV</button>
      <button onClick={play}>PLAY</button>
      <button onClick={pause}>PAUSE</button>
      <button onClick={nextTrack}>NEXT</button>
    </div>
  );
}

export default App;
