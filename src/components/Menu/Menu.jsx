import React, { useRef, useState } from "react";
import './Menu.css'

function Menu() {
    const audioRef = useRef(null)
    const arrayMusic = ['zabud', 'ameli', 'blindzone', 'kolokol']
    const [trackIndex, setTrackIndex] = useState({
        index: 0
    })

    const play = () => {
        audioRef.current.play()
    }

    const pause = () => {
        console.log(audioRef.current.duration)
        console.log(audioRef.current.currentTime)
        console.log(audioRef.current.ended)
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
        setTimeout(play, 0)
    }

    const prevTrack = () => {
        const copyState = { ...trackIndex }
        if (copyState.index <= 0) {
            copyState.index = arrayMusic.length - 1
        } else {
            copyState.index--
        }
        setTrackIndex(copyState)
        setTimeout(play, 0)
    }
    return (
        <div className="menu">
            <audio
                ref={audioRef}
                style={{ 'display': 'none' }}
                onEnded={nextTrack}
                src={`./music/${arrayMusic[trackIndex.index]}.mp3`}>
            </audio>
            <a className="download_music_link" download={'myMusic'} href={`./music/${arrayMusic[trackIndex.index]}.mp3`}>Скачать</a>
            <p>Сейчас играет - {arrayMusic[trackIndex.index]}</p>
            <button className="audioMenu_btn" onClick={prevTrack}>←</button>
            <button className="audioMenu_btn" onClick={play}>▷</button>
            <button className="audioMenu_btn" onClick={pause}>| |</button>
            <button className="audioMenu_btn" onClick={nextTrack}>→</button>
        </div>
    );
}

export default Menu;
