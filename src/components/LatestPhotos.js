import React, {Component} from 'react';

class LatestPhotos extends Component {
    render() {
        return (
            <div className="col-lg-3">
                <div className="single-photo-item">
                    <a href="d-block">
                        <img src="http://placehold.it/600x350" alt=""/>
                        <h5>Project Name</h5>
                        <p className="cat-name">Category Name</p>
                    </a>

                </div>
            </div>
        );
    }
}

export default LatestPhotos;