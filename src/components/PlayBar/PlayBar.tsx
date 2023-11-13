import {AudioContex} from '../../context/AudioContex.tsx'
import {useContext, useEffect, useState} from "react";
import style from './PlayBar.module.scss'
import {IconButton, Slider} from "@mui/material";
import {Pause, PlayArrow} from "@mui/icons-material";
import secondsToMMSS from "../../utils/seconndstoMMSS.ts";

const TimeControl = () => {

    const [currentTime, setCurrentTime] = useState(0)
    const {audio, currentTrack} = useContext(AudioContex)
    const {duration} = currentTrack

    const formattedCurrentTime = secondsToMMSS(currentTime)
    const sliderCurrentTime = Math.round((currentTime / duration) * 100)
    const handleChangeCurrentTime = (_: Event, value: number | number[] ) => {
        const time = Math.round((Array.isArray(value) ? value[0] : value) / 100 * duration);
        setCurrentTime(time)
        audio.currentTime = time
    }


    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1000)
        return () => {
            clearInterval(timeInterval)
        }
    }, [audio.currentTime]);

    return (
        <>
            <p>{formattedCurrentTime}</p>
            <Slider
                step={1}
                min={0}
                max={100}
                value={sliderCurrentTime}
                onChange={handleChangeCurrentTime}/>
        </>
    )
}

const PlayBar = () => {

    const {handleToggleAudio, currentTrack, isPlaying} = useContext(AudioContex)
    const {preview, duration, title, artists} = currentTrack
    const formattedDuration = secondsToMMSS(duration)

    return (
        <div className={style.playbar}>
            <img className={style.preview} src={preview} alt=''/>
            <IconButton onClick={() => handleToggleAudio(currentTrack)}></IconButton>
            {isPlaying ? <Pause/> : <PlayArrow/>}
            <div className={style.credits}>
                <h4>{title}</h4>
                <p>{artists}</p>
            </div>
            <div className={style.slider}>
                <TimeControl/>
                <p>{formattedDuration}</p>
            </div>
        </div>
    );
};

export default PlayBar;