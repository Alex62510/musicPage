import tracksList from "../../assets/tracksList";
import style from './manePage.module.scss'
import Track from "../../components/Track/Track.tsx";
import {Input} from "@mui/material";
import {ChangeEvent, useState} from "react";

const runSearch = (query: string) => {
    if (!query) {
        return tracksList
    }
    const loverCaseQuery = query.toLowerCase()
    return tracksList.filter((track) =>
        track.title.toLowerCase().includes(loverCaseQuery) ||
        track.artists.toLowerCase().includes(loverCaseQuery))
}

const ManePage = () => {
    const [tracks, setTracks] = useState(tracksList)
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTracks(runSearch(event.target.value))
    }
    return (
        <div className={style.search}>
            <Input className={style.input} placeholder='search track' onChange={handleChange}/>
            <div className={style.list}>
                {tracks.map((track) => <Track key={track.id} {...track}/>)}
            </div>
        </div>
    );
};

export default ManePage;