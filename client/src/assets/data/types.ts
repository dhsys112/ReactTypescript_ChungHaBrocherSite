// AlbumData
export interface ImageDataType {
    idx : number 
    src : string
    alt : string
}

export interface AlbumIntroDataType {
    id : number | undefined
    order : number | undefined
    title : string
    song : string
    year : string
    paragraphOne : string
    image : string | undefined
}

export interface ImageInfoType {
    title : string
    price? : string
    path  : string
    label : string
    image : string | undefined
    alt   : string 
}

export interface SingleAlbumDataType {
    id : number | undefined
    order : number | undefined
    title : string
    song : string
    year : string
    paragraphOne : string
    paragraphTwo : string
    images : Array<ImageInfoType>
}

