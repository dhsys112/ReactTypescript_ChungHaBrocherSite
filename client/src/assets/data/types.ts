// AlbumData
export interface ImageDataType {
    idx : number 
    src : string
    alt : string
}

export interface AlbumIntroDataType {
    id          : number | undefined
    order       : number | undefined
    albumName   : string
    artistNm    : string
    titleSong   : string 
    albumImg    : string 
    albumOpenDate : Date
}

export interface InfoSectionProps {
    heading: string;
    paragraphOne: string;
    paragraphTwo: string;
    buttonLabel: string;
    reverse: boolean;
    image: string | undefined;
    delay: number;
    id : number 
  }

export interface ImageInfoType {
    albumId     : string
    albumName   : string
    artistNm    : string
    albumUrl    : string
    label       : string
    titleSong   : string 
    albumImg    : string 
    alt         : string 
    albumOpenDate : Date
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

export interface SongType {
    img        : string
    albumName  : string 
    songTitle  : string
    paragraph1 : string 
    paragraph2 : string 
}
