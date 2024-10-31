import React, { useEffect, useRef, useState } from "react";
import './Menu.css'

function Menu() {
    const progressbarRef = useRef(null)
    const audioRef = useRef(null)

    const [trackIndex, setTrackIndex] = useState({ index: 0 })
    const [currentTime, setCurrentTime] = useState({ value: 0, nowTime: '00:00:00', duration: '00:00:00' })
    const [activeButton, setActiveButton] = useState({ play: '', pause: '', shuffle: '', repeat: '' })

    const arrayMusic = [
        { file: 'zabud', author: 'Guram D, Toxi$', name: 'Забудь' },
        { file: 'ameli', author: 'Big Baby Tape, Aarne, Toxi$', name: 'Ameli' },
        { file: 'blindzone', author: 'Obladaet', name: 'Blind Zone' }
    ]

    useEffect(() => {
        if (!audioRef.current) return
        const updateProgressbar = () => {
            const fullPB = progressbarRef.current.max * audioRef.current.currentTime / audioRef.current.duration
            const copyState = { ...currentTime }
            if (!isNaN(audioRef.current.duration)) {
                copyState.nowTime = new Date(audioRef.current.currentTime * 1000).toISOString().substring(11, 19)
                copyState.duration = new Date(audioRef.current.duration * 1000).toISOString().substring(11, 19)
            }
            copyState.value = String(fullPB)
            setCurrentTime(copyState)
        }
        audioRef.current.addEventListener('timeupdate', updateProgressbar)
    }, [])

    const play = () => {
        audioRef.current.play()
        const copyState = { ...activeButton }
        if (copyState.play !== 'active_btn') {
            copyState.play = 'active_btn'
            copyState.pause = ''
        }
        setActiveButton(copyState)
    }


    const pause = () => {
        audioRef.current.pause()
        const copyState = { ...activeButton }
        if (copyState.pause !== 'active_btn') {
            copyState.play = ''
            copyState.pause = 'active_btn'
        }
        setActiveButton(copyState)
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

    const shuffle = () => {
        const copyState = { ...trackIndex }
        copyState.index = Math.floor(Math.random() * arrayMusic.length)
        setTrackIndex(copyState)
        setTimeout(play, 0)
    }

    const repeat = () => {
        const copyState = { ...trackIndex }
        copyState.index = copyState.index
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

    const changeToRepeatTrack = () => {
        const activeButtonCopy = { ...activeButton }
        const audioPlayerCopy = { ...statePlayer }

        if (statePlayer[0].name !== 'repeat') {
            activeButtonCopy.shuffle = ''
            activeButtonCopy.repeat = 'active_btn'
            audioPlayerCopy[0] = stateAudioPlayer[0].repeat
        } else {
            activeButtonCopy.repeat = ''
            audioPlayerCopy[0] = stateAudioPlayer[0].nextTrack
        }

        setActiveButton(activeButtonCopy)
        setStatePlayer(audioPlayerCopy)
    }
    const changeToShuffleTrack = () => {
        const activeButtonCopy = { ...activeButton }
        const audioPlayerCopy = { ...statePlayer }
        if (statePlayer[0].name !== 'shuffle') {
            activeButtonCopy.shuffle = 'active_btn'
            activeButtonCopy.repeat = ''
            audioPlayerCopy[0] = stateAudioPlayer[0].shuffle
        } else {
            activeButtonCopy.shuffle = ''
            audioPlayerCopy[0] = stateAudioPlayer[0].nextTrack
        }

        setStatePlayer(audioPlayerCopy)
        setActiveButton(activeButtonCopy)
    }

    const stateAudioPlayer = [{ nextTrack: nextTrack, shuffle: shuffle, repeat: repeat }]
    const [statePlayer, setStatePlayer] = useState([nextTrack])

    return (
        <div className="menu">
            <audio
                ref={audioRef}
                style={{ 'display': 'none' }}
                onEnded={statePlayer[0]}
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
                    <button className={`audioMenu_btn around_btn ${activeButton.play}`} onClick={play}>▷</button>
                    <button className={`audioMenu_btn around_btn ${activeButton.pause}`} onClick={pause}>| |</button>
                    <button className="audioMenu_btn prev_btn" onClick={nextTrack}>≫</button>
                </div>
                <div className="audioMenu_block_btn">
                    <button onClick={changeToShuffleTrack} className={`audioMenu_btn around_btn ${activeButton.shuffle}`} >⮂</button>
                    <a className="download_music_link" download={`${arrayMusic[trackIndex.index].name}`} href={`./music/${arrayMusic[trackIndex.index].file}.mp3`}>⇩</a>
                    <button onClick={changeToRepeatTrack} className={`audioMenu_btn around_btn ${activeButton.repeat}`} >⟲</button>
                </div>
            </div>
        </div >
    );
}

export default Menu;
