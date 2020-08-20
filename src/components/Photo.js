import React, {Component} from 'react';
import axios from "axios";

class Photo extends Component {

    state = {
        photos: [],
        loading: true,
    }


    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let photo_id = params.get('id');


        axios.get('https://api.unsplash.com/photos/' + photo_id + '/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA').then(
            res => this.setState({
                photo: res.data,
                loading: false
            })
        )
    }


    render() {
        console.log(this.state.photos);
        return (
            <div>
                <h2>Single Photo Details</h2>
            </div>
        );
    }
}

export default Photo;
