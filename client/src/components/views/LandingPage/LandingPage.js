import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {
    
    const [movies, setMovies] = useState([])
    const [mainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)

    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                console.log(res.results)
                setMovies([...movies, ...res.results])
                setMainMovieImage(res.results[0])
                setCurrentPage(res.page)
            })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
        fetchMovies(endpoint)
    }
    
    return (
        <div style={{ width: '100%', margin: '0' }}>
            {mainMovieImage && 
                <MainImage 
                    image={ `${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}` } 
                    title={mainMovieImage.original_title}
                    text={mainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Latest Movies</h2>
                <hr></hr>
                <Row gutter={[16, 16]}>
                    {movies && movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                landingPage
                                image={movie.poster_path ? 
                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>
            </div>
            
            <div style={{ textAlign:"center" }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
