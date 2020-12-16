import Axios from 'axios'
import React, { useEffect, useState } from 'react';
import './favorite.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../Config';

function FavoritePage() {

    // let variables = {
    //     // models의 Favorite에 담긴 것만 추가해야함 
    //     // (routes의 favorite.js에 const { Favorite } = require('../models/Favorite'); 이런 식으로 엮였으니)
    //     userFrom: userFrom,
    //     movieId: movieId,
    //     movieTitle: movieTitle,
    //     moviePost: moviePost,
    //     movieRunTime: movieRunTime
    // }

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(res => {
                if(res.data.success) {
                    // console.log(res.data);
                    setFavorites(res.data.favorites)
                } else {
                    alert('영화 정보를 가져오는데 실패했습니다.')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }
        Axios.post('/api/favorite/onClickDelete', variables)
            .then(res => {
                if(res.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('좋아하는 영화 리스트에서의 삭제를 실패했습니다.')
                }
            })
    }

    const renderCards = favorites.map((favorite, index) => {
        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "mo image"
                }
            </div>
        )
        return <tr key={index}>
            <Popover content = {content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>
            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Runtime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
