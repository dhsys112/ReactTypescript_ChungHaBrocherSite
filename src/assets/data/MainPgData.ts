import {IMAGES_DATA} from 'assets/images'

export const MainPageIntroDatas = [
        {
            id : undefined,
            order : undefined,
            title: '1st Mini Album [Hands on Me]',
            song : 'Why Don\'t You Know',
            year:'2017.06.07',
            paragraphOne: '걸그룹 I.O.I에서 여성 솔로 아티스트로의 첫 발걸음을 떼는 청하의 첫 번째 미니앨범 ‘Hands on Me’. ',
            image: undefined
        },
        {
            id : undefined,
            order : undefined,
            title: '1st Mini Album [Hands on Me]',
            song : 'Why Don\'t You Know',
            year:'2017.06.07',
            paragraphOne: '걸그룹 I.O.I에서 여성 솔로 아티스트로의 첫 발걸음을 떼는 청하의 첫 번째 미니앨범 ‘Hands on Me’. ',
            image: undefined
        }
    ]

export const MainPageAlbumDatas = [
    {
        id : undefined,
        order : undefined ,
        title: '1st Mini Album [Hands on Me]',
        song : 'Why Don\'t You Know',
        year:'2017.06.07',
        paragraphOne: '걸그룹 I.O.I에서 여성 솔로 아티스트로의 첫 발걸음을 떼는 청하의 첫 번째 미니앨범 ‘Hands on Me’. ',
        paragraphTwo:
            '보컬과 댄스 모두 완벽한 ‘갓청하’의 진가를 증명할 이번 앨범은 실력파 래퍼 넉살이 피처링한 타이틀곡을 비롯해 각기 다른 장르의 다섯 트랙이 수록됐다. 솔로 아티스트로 다시 한 번 가요계 출발점에 선 청하를 향해 손을 뻗어, 함께해주세요!',
        musicVideo : '<iframe width="560" height="315" src="https://www.youtube.com/embed/By9-Lqn5358" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        performanceVideo : '<iframe width="560" height="315" src="https://www.youtube.com/embed/By9-Lqn5358" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        images : [
            {
                title: 'ChungHa',
                // price: '$2,000',
                path: '/hitSongs',
                label: 'View Song',
                image: undefined,
                alt: 'House'
                },
                {
                title: 'ChungHa',
                // price: '$2,860,000',
                path: '/hitSongs',
                label: 'View Song',
                image: undefined,
                alt: 'House'
                },
                {
                title: 'ChungHa',
                // price: '$8,420,000',
                path: '/hitSongs',
                label: 'View Song',
                image: undefined,
                alt: 'House'
                }
        ]
    },
    {
        id : undefined,
        order : undefined ,
        title: '1st Mini Album [Hands on Me]',
        song : 'Why Don\'t You Know',
        year:'2017.06.07',
        paragraphOne: '걸그룹 I.O.I에서 여성 솔로 아티스트로의 첫 발걸음을 떼는 청하의 첫 번째 미니앨범 ‘Hands on Me’. ',
        paragraphTwo:
            '보컬과 댄스 모두 완벽한 ‘갓청하’의 진가를 증명할 이번 앨범은 실력파 래퍼 넉살이 피처링한 타이틀곡을 비롯해 각기 다른 장르의 다섯 트랙이 수록됐다. 솔로 아티스트로 다시 한 번 가요계 출발점에 선 청하를 향해 손을 뻗어, 함께해주세요!',
        musicVideo : '<iframe width="560" height="315" src="https://www.youtube.com/embed/By9-Lqn5358" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        performanceVideo : '<iframe width="560" height="315" src="https://www.youtube.com/embed/By9-Lqn5358" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
        images : [
            {
                title: 'ImageOne',
                price: '$2,000',
                path: '/hitSongs',
                label: 'View Song',
                image: undefined,
                alt: 'House'
                },
                {
                title: 'ImageTwo',
                price: '$2,860,000',
                path: '/hitSongs',
                label: 'View Song',
                image: undefined,
                alt: 'House'
                },
                {
                title: 'ImageThree',
                price: '$8,420,000',
                path: '/hitSongs',
                label: 'View Song',
                image: undefined,
                alt: 'House'
                }
        ]
    }
]

export const AlbumsLength = MainPageIntroDatas.length
// Assign common ids to datas
const MakeCommonAlbumIds = (albumLengths, AlbumIntroDatas, SingleAlbumDatas) => {
    console.log("make Ids")
    const AlbumIds = []
    Array(albumLengths).fill(0).forEach((e,idx) => AlbumIds.push(idx))
    AlbumIds.forEach((AlbumId,idx) => {
        // console.log("albumId in making func", id )
        AlbumIntroDatas[idx].id     = AlbumId
        SingleAlbumDatas[idx].id        = AlbumId

        AlbumIntroDatas[idx].order  = AlbumId
        SingleAlbumDatas[idx].order     = AlbumId
    })
}
MakeCommonAlbumIds(AlbumsLength, MainPageIntroDatas, MainPageAlbumDatas)
// AlbumIntroDatas.forEach((e) => console.log("Intro Album id",e.id))
// SingleAlbumDatas.forEach((e) => console.log("Single Album id",e.id))

const AssignImageDatas = (ImgArr,AlbumIntroDatas,SingleAlbumDatas) => {
    // 6개단위로 쪼갠다
    // 각 6개마다, 1번째 요소들만은, intro 에
    // 각 6개마다, 3개 모두는 single 에
    for(let i = 0 ; i < 1 ; i++){
        let tmpImgs = ImgArr.slice(3*i,3*i + 3)
        AlbumIntroDatas[i].image = tmpImgs[0]
        tmpImgs.forEach((img,idx) => SingleAlbumDatas[i].images[idx].image = img)
    }
}
AssignImageDatas(IMAGES_DATA, MainPageIntroDatas, MainPageAlbumDatas)