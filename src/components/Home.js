import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Config from '../api';
import axios from "axios";
import Spinner from './Spinner';

class Home extends Component{
    constructor(){
        super();
        this.state = {
            movies: []
        }
    }
    componentDidMount(){
        const movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${Config.api_key}`

        axios.get(movieUrl).then((response)=>{
            const movieData = response.data.results
            this.setState({
                movies : movieData
            })
            
        })
    }
    render(){
        console.log(this.state.movies)

        if(this.state.movies.length===0){
            return <Spinner />
        }

        const moviesImagesUrl = this.state.movies.map((movie, i) => {
            const imgUrl = `http://image.tmdb.org/t/p/w300`
            return (
                <div className="col s12 l3 m6 center" key={i}>
                    <Link to={`/movie/${movie.id}`}>
                        <img className="homeImages" alt={movie.original_title} src = {`${imgUrl}${movie.poster_path}` } />
                    </Link>
                </div>
            )
        })
        return (
            <div className="homepage">
                <div className="row" style={{marginBottom:0}}>
                    {moviesImagesUrl}
                </div>
            </div>
            
        )
    }
}

export default Home;