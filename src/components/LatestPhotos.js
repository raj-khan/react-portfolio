import React, {Component} from 'react';
import axios from 'axios';


class LatestPhotos extends Component {

    state = {
        photos: [],
        page: 1,
        loading: true,
        searching: false,
        search_query: ''
    }

    componentDidMount() {
        this.setState({page: this.state.page + 1});

        axios.get('https://api.unsplash.com/photos/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA&per_page=16&page=' + this.state.page ).then(
            res => this.setState({
                photos: res.data,
                loading: false,

            })
        );
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    loadNextPage = (e) => {
        console.log(this.state.page);
        axios.get('https://api.unsplash.com/photos/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA&per_page=16&page=' + this.state.page).then(
            res => this.setState({
                photos: res.data,
                loading: false,
                page: this.state.page + 1
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }


    searchQuery = (e) => {
        this.setState({
            search_query: e.target.value
        })

    }

    searchTrigger = (e) => {
        axios.get('https://api.unsplash.com/search/photos/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA&query=' + this.state.search_query + '&per_page=16 6&page='
            + this.state.page).then(
            res => this.setState({
                photos: res.data.results,
                loading: false,
                page: 2,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages
            })
        )

        e.preventDefault();
    }




    loadNextSearchPage = (e) => {
        axios.get('https://api.unsplash.com/search/photos/?client_id=wu7CUeow5HCvgKDOIZ3801ePPSO4A_UwuyBYyycDQaA&query=' + this.state.search_query + '&per_page=16 6&page='
            + this.state.page).then(
            res => this.setState({
                photos: res.data.results,
                loading: false,
                page: this.state.page + 1,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages
            })
        )

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })

    }


    render() {

        let searchHeading;

        let searchButtonMarkup;

        let searchInfo;

        if(this.state.searching === true)
        {
            searchHeading = <h2>You searching with     <i>{this.state.search_query}</i> </h2>

            searchButtonMarkup = <button className="btn btn-success"  onClick={this.loadNextSearchPage}>Load Page {this.state.page}</button>

            searchInfo = <span>Total Found: {this.state.total_found} | Page {this.state.page - 1} of {this.state.total_found_pages}</span>;
        }else
        {
            searchHeading = <h2>Latest Projects</h2>
            searchButtonMarkup = <button className="btn btn-success"  onClick={this.loadNextPage}>Load Page {this.state.page}</button>

            searchInfo = '';
        }


        if (this.state.loading === true) {
            return (
                <div className="row text-center text-danger">
                    <div className="col">Photos are Loading</div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <div className="row top-heading">
                    <div className="col my-auto">{searchHeading} {searchInfo}</div>
                    <div className="col col-auto my-auto">
                        <form action="" onSubmit={this.searchTrigger}>
                            <input type="text" value={this.state.search_query} onChange={this.searchQuery}
                                   placeholder="Search Here"/>
                            <input type="submit" value="search"/>
                        </form>
                    </div>
                </div>

                <div className="row">


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

                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <div className="load-more-btn text-center ">
                            {searchButtonMarkup}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LatestPhotos;
