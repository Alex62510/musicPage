import {FC, useContext} from "react";
import style from './Track.module.scss'
import {IconButton} from "@mui/material";
import {AudioContex} from "../../context/AudioContex.tsx";
import {Pause, PlayArrow} from "@mui/icons-material";
import secondsToMMSS from "../../utils/seconndstoMMSS.ts";
import cn from "classnames"

export type TrackType = {
    id: number
    src: string
    preview: string
    duration: number
    title: string
    artists: string
}

const Track: FC<TrackType> = ({artists, duration, preview, title, id, src}) => {
    const track = {id, duration, preview, title, artists, src}

    const {handleToggleAudio, currentTrack, isPlaying} = useContext(AudioContex)
    const isCurrentTrack = currentTrack.id === track.id

    const formattedDuration = secondsToMMSS(duration)

    return (
        <div className={cn(style.track, isCurrentTrack && style.playing)}>
            <IconButton onClick={() => handleToggleAudio(track)}>
                {isCurrentTrack && isPlaying ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <img className={style.preview} src={preview} alt=''/>
            <div className={style.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{formattedDuration}</p>
        </div>
    );
};

export default Track;