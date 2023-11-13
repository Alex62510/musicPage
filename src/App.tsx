import ManePage from "./pages/MainPage/ManePage.tsx";
import style from './global.module.scss'
import PlayBar from "./components/PlayBar/PlayBar.tsx";

const App=()=>{
    return(
        <div className={style.wrapper}>
            <ManePage/>
            <PlayBar/>
        </div>
    )
}

export default App
