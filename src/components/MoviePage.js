import React, {Component} from 'react';
import config from '../api';
import axios from 'axios';
import Spinner from './Spinner';

class MoviePage extends Component{
    constructor(){
        super();
        this.state = {
            movieDetail : []

        }
    }
    componentDidMount(){
        const id = this.props.match.params.movieId
        const singleMovieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${config.api_key}`
        axios.get(singleMovieUrl).then((response) => {
            this.setState({
                movieDetail : response.data
            })
        })

    }
    render(){
        console.log(this.state.movieDetail);
        var flag = 0;
        var flag1 = 0;
        if(this.state.movieDetail.length===0){
            return <Spinner />
        }
        
        if(this.state.movieDetail.spoken_languages!==undefined)
        {
            var spoken = this.state.movieDetail.spoken_languages.map((lang,i)=>{
                flag = 1;
                return(
                    <span key={i}>{lang.name} </span>
                )
            })   
        }

        if(this.state.movieDetail.genres!==undefined)
        {
            var genres = this.state.movieDetail.genres.map((lang,i)=>{
                flag1 = 1;
                return(
                    <span key={i}>{lang.name} </span>
                )
            })   
        }
        
        return (
            <div className="moviePage">
                <div className="row" style={{marginBottom:0}}>
                    <div className="col s12 center" style={{marginBottom:50}}>
                        <h3>{this.state.movieDetail.tagline}</h3>
                        <img alt={this.state.movieDetail.original_title} src = {`http://image.tmdb.org/t/p/w300/${this.state.movieDetail.poster_path}`} style={{ marginBottom: 20}}/>
                        <div className="field"><span className="heading">Movie Name</span> : {this.state.movieDetail.original_title}</div>
                        <div className="field"><span className="heading">Language</span> : {this.state.movieDetail.original_language}</div>
                        <div className="field"><span className="heading">Spoken Languages</span> : {flag? spoken:null}</div>
                        <div className="field"><span className="heading">Genres</span> : {flag1? genres:null}</div>
                        <div className="field"><span className="heading">Release Date</span> : {this.state.movieDetail.release_date}</div>  
                        <div className="field"><span className="heading">Overview</span> : {this.state.movieDetail.overview}</div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MoviePage;