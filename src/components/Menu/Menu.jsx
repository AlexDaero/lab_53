import React, { useRef, useState } from "react";
import './Menu.css'

function Menu() {
    const progressbarRef = useRef(null)
    const audioRef = useRef(null)
    const arrayMusic = ['zabud', 'ameli', 'blindzone']
    const [trackIndex, setTrackIndex] = useState({ index: 0 })
    let progressPB

    const play = () => {
        audioRef.current.play()
        progressPB = setInterval(() => {
            const fullPB = progressbarRef.current.max * audioRef.current.currentTime / audioRef.current.duration
            progressbarRef.current.value = fullPB
            console.log('1')
        }, 1000)
    }

    const pause = () => {
        audioRef.current.pause()
        clearInterval(progressPB)
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

    const chooseTimeProgressbar = (event) => {
        const x = event.pageX - progressbarRef.current.offsetLeft
        const clickedValue = x * progressbarRef.current.max / progressbarRef.current.offsetWidth
        progressbarRef.current.value = clickedValue
        audioRef.current.currentTime = audioRef.current.duration * (clickedValue / 100)
    }

    const getProgressPB = () => {
        const fullPB = Math.round(progressbarRef.current.max * audioRef.current.currentTime / audioRef.current.duration)
        progressbarRef.current.value = fullPB
    }

    return (
        <div className="menu">
            <audio
                ref={audioRef}
                style={{ 'display': 'none' }}
                onEnded={nextTrack}
                src={`./music/${arrayMusic[trackIndex.index]}.mp3`}>
            </audio>
            <progress onClick={chooseTimeProgressbar} ref={progressbarRef} max='100' value='0'></progress>
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
