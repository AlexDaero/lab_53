import React, { useEffect, useRef, useState } from "react";
import './Menu.css'

function Menu() {
    const progressbarRef = useRef(null)
    const audioRef = useRef(null)
    const arrayMusic = ['zabud', 'ameli', 'blindzone']
    const [trackIndex, setTrackIndex] = useState({ index: 0 })
    const arrayInter = []
    let progressPB
    const [isPlay, setIsPlay] = useState([false])

    const play = () => {
        if (isPlay) {
            audioRef.current.play()
            const copyState = [...isPlay]
            copyState[0] = true
            setIsPlay(copyState)
            return
        }
        alert('Трек уже проигрывается')
    }

    useEffect(() => {
        if (isPlay[0]) {
            progressPB = setInterval(() => {
                const fullPB = progressbarRef.current.max * audioRef.current.currentTime / audioRef.current.duration
                progressbarRef.current.value = fullPB
            }, 1000)
            arrayInter.push(progressPB)
            return
        }
        clearAllInterval()
    })

    const pause = () => {
        audioRef.current.pause()
        const copyState = [...isPlay]
        copyState[0] = false
        setIsPlay(copyState)
        clearAllInterval()
    }

    const clearAllInterval = () => {
        for (let i = 0; i < arrayInter.length; i++) {
            clearInterval(arrayInter[i])
        }
    }

    const nextTrack = () => {
        pause()
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
        pause()
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

    return (
        <div className="menu">
            <audio
                ref={audioRef}
                style={{ 'display': 'none' }}
                onEnded={nextTrack}
                src={`./music/${arrayMusic[trackIndex.index]}.mp3`}>
            </audio>
            <div className="audioMenu_display">
                <p className="audioMenu_trackName">Сейчас играет - {arrayMusic[trackIndex.index]}</p>
                <progress className="audioMenu_progressbar" onClick={chooseTimeProgressbar} ref={progressbarRef} max='100' value='0'></progress>
            </div>
            <div className="audioMenu_block">
                <div className="audioMenu_block_btn">
                    <button className="audioMenu_btn next_btn" onClick={prevTrack}>≪</button>
                    <button className="audioMenu_btn around_btn" onClick={play}>▷</button>
                    <button className="audioMenu_btn around_btn" onClick={pause}>| |</button>
                    <button className="audioMenu_btn prev_btn" onClick={nextTrack}>≫</button>
                </div>
                <a className="download_music_link" download={'myMusic'} href={`./music/${arrayMusic[trackIndex.index]}.mp3`}>⇩</a>
            </div>
        </div>
    );
}

export default Menu;
