import {useEffect, useState, useRef} from 'react'
import { PictureDatas } from 'assets/data/Pictures'

export default function GetPictureData(pictureNum) {
    const [loading, setLoading]   = useState(true)
    const [pictures, setPictures] = useState([])
    const [curPictNum, setCurPictNum] = useState(() => 0)
    const [hasMore, setHasMore]   = useState(false)

    useEffect(() => {
        setLoading(true)
        setPictures(prevPicts => {
            return [...prevPicts, PictureDatas.slice()][0]
        })
        setHasMore(PictureDatas.slice().length > 0 )
        setCurPictNum(pictureNum + 5)
        setLoading(false)
    },[pictureNum])

    console.log("")

    return {loading, pictures, hasMore};
}
