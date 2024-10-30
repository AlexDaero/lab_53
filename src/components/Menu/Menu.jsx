import React, { useEffect, useRef, useState } from "react";
import './Menu.css'

function Menu() {
    const progressbarRef = useRef(null)
    const audioRef = useRef(null)
    const arrayMusic = [
        { file: 'zabud', author: 'Guram D, Toxi$', name: 'Забудь' },
        { file: 'ameli', author: 'Big Baby Tape, Aarne, Toxi$', name: 'Амели' },
        { file: 'blindzone', author: 'Obladaet', name: 'Blind Zone' }
    ]
    const [trackIndex, setTrackIndex] = useState({ index: 0 })
    let progressPB
    const [isPlay, setIsPlay] = useState([false])

    const play = () => {
        if (!isPlay[0]) {
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
                console.log('interval')
            }, 1000)
            return
        }
        clearInterval(progressPB)
    })

    const pause = () => {
        audioRef.current.pause()
        const copyState = [...isPlay]
        copyState[0] = false
        setIsPlay(copyState)
        clearInterval(progressPB)
        console.log(isPlay[0])
    }

    const nextTrack = () => {
        pause()
        const copyState = { ...trackIndex }
        if (copyState.index >= arrayMusic.length - 1) {
            return
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
            return
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
                src={`./music/${arrayMusic[trackIndex.index].file}.mp3`}>
            </audio>
            <div className="audioMenu_display">
                <p className="audioMenu_trackName">{arrayMusic[trackIndex.index].name} - {arrayMusic[trackIndex.index].author}</p>
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
