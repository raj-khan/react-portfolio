import React, {Component} from 'react';
import axios from 'axios';


class LatestPhotos extends Component {

    state = {
        photos: [],
        page: 1,
        loading: true
    }

    componentDidMount() {
        axios.get('https://api.unsplash.com/photos/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA&per_page=16&page='+this.state.page).then(
            res => this.setState({
                photos: res.data,
                loading: false
            })
        );
        window.scrollTo(0, 0)
    }

    loadNextPage = (e) => {
        this.setState({page: this.state.page + 1});

        axios.get('https://api.unsplash.com/photos/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA&per_page=16&page='+this.state.page).then(
            res => this.setState({
                photos: res.data,
                loading: false
            })
        )
    }

    render() {

        if(this.state.loading === true)
        {
            return (
                <div className="text-center text-danger">Photos are Loading</div>
            )
        }

        return (
            <React.Fragment>
                {
                    this.state.photos.map((photo) => (
                        <div key={photo.id} className="col-lg-3">
                            <div className="single-photo-item">
                                <a className="d-block" href="/">
                                    <div className="photo-wrapper">
                                        <img src={photo.urls.small} alt={photo.description}/>
                                    </div>

                                    <h5>{photo.description}</h5>
                                    <p className="cat-name">by - {photo.user.first_name} {photo.user.last_name}</p>
                                </a>

                            </div>
                        </div>
                    ))
                }


                <div className="col-lg-12">
                    <div className="load-more-btn">
                        <button onClick={this.loadNextPage}>Load Page {this.state.page}</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LatestPhotos;