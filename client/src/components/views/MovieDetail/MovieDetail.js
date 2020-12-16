import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row, Button } from 'antd';

function MovieDetail(props) {

    // movie/48888 <-- 이런식으로 url 나타나진 거 가져오는 방법
    // App.js에서 :movieId로 지정을 했기 때문에
    let movieId = props.match.params.movieId
    // console.log(props.match)
    const [movie, setMovie] = useState([])
    const [casts, setCasts] = useState([])
    const [actorToggle, setActorToggle] = useState(false)

    // useEffect란 맨 처음 페이지 로드될때 처음에 할 동작들을 넣어주는 것
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                setMovie(res)
            })

        fetch(endpointCrew)
            .then(res => res.json())
            .then(res => {
                setCasts(res.cast)
            })
    }, [])
    
    return (
        <div>
            {/* Header */}
            <MainImage
                image={ `${IMAGE_BASE_URL}w1280${movie.backdrop_path}` } 
                title={movie.original_title}
                text={movie.overview}
            />
            {/* Body */}
            <div style={{ width:'85%', margin:'1rem auto' }}>
                <div style={{ display:'flex', justifyContent:'flex-end' }}>
                    <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo
                    movie ={movie}
                />
                <br/>
                {/* Actors Grid */}
                <div style={{ display:'flex', justifyContent:'center', margin:'2rem' }}>
                    <Button onClick={() => setActorToggle(!actorToggle)}>Toggle Actor View</Button>
                </div>

                {actorToggle && 
                <Row gutter={[16, 16]}>
                    {casts && casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ? 
                                `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                characterName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                }

                

            </div>
        </div>
    )
}

export default MovieDetail
