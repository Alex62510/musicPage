import {createContext, useState} from 'react'
import tracksList from "../assets/tracksList.ts";
import {TrackType} from "../components/Track/Track.tsx";

const audio = new Audio()

export const AudioContex = createContext<any>({})
// @ts-ignore
const AudioProvider = ({children}) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0])
    const [isPlaying, setIsPlaying] = useState(false)

    const handleToggleAudio = (track: TrackType) => {
        if (currentTrack.id !== track.id) {
            setCurrentTrack(track)
            setIsPlaying(true)

            audio.src = track.src
            audio.currentTime = 0
            audio.play()
            return
        }
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.play()
            setIsPlaying(true)
        }
    }
    const value = {audio, currentTrack, isPlaying, handleToggleAudio}

    return <AudioContex.Provider value={value}>{children}</AudioContex.Provider>
}
export default AudioProvider