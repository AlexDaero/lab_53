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
    const [currentTime, setCurrentTime] = useState({ value: 0, nowTime: '', duration: '' })
    let isPlay = false
    let minute = 0
    let seconds = 0

    const play = () => {
        if (!isPlay) {
            audioRef.current.play()
            isPlay = true
            return
        }
        alert('Трек уже проигрывается')
    }

    useEffect(() => {
        if (!audioRef.current) return
        const updateProgressbar = () => {
            const fullPB = progressbarRef.current.max * audioRef.current.currentTime / audioRef.current.duration
            const copyState = { ...currentTime }
            copyState.nowTime = new Date(audioRef.current.currentTime * 1000).toISOString().substring(11, 19)
            copyState.duration = new Date(audioRef.current.duration * 1000).toISOString().substring(11, 19)
            copyState.value = String(fullPB)
            setCurrentTime(copyState)
        }
        audioRef.current.addEventListener('timeupdate', updateProgressbar)
    }, [])

    const pause = () => {
        audioRef.current.pause()
        isPlay = false
    }

    const nextTrack = () => {
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
                <p className="audioMenu_trackName">{currentTime.nowTime} : {currentTime.duration}</p>
                <progress className="audioMenu_progressbar" onClick={chooseTimeProgressbar} ref={progressbarRef} max='100' value={currentTime.value}></progress>
            </div>
            <div className="audioMenu_block">
                <div className="audioMenu_block_btn">
                    <button className="audioMenu_btn next_btn" onClick={prevTrack}>≪</button>
                    <button className="audioMenu_btn around_btn" onClick={play}>▷</button>
                    <button className="audioMenu_btn around_btn" onClick={pause}>| |</button>
                    <button className="audioMenu_btn prev_btn" onClick={nextTrack}>≫</button>
                </div>
                <div className="audioMenu_block_btn">
                    <button className="audioMenu_btn around_btn" >∞</button>
                    <a className="download_music_link" download={`${arrayMusic[trackIndex.index].name}`} href={`./music/${arrayMusic[trackIndex.index].file}.mp3`}>⇩</a>
                    <button className="audioMenu_btn around_btn" >⟲</button>
                </div>
            </div>
        </div>
    );
}

export default Menu;
