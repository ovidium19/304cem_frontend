import React from 'react'
import './HomePage.less'
import {Link} from 'react-router-dom'
export default class HomePage extends React.Component {
    render() {
        return (
            <div className="pb-4 home-container hide">
                <img className='bg-main img-fluid' src='/logo.jpg'/>
                <span className="overlay"/>
                <div className="overlay-content">
                    <div id="carouselHome" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li className="mx-3" data-target="#carouselHome" data-slide-to="1"></li>
                            <li className="mx-3" data-target="#carouselHome" data-slide-to="2"></li>
                            <li className="mx-3" data-target="#carouselHome" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className='carousel-item active w-100 h-100 text-center'>
                                <div className="d-flex justify-content-center align-items-center">
                                    <p className="display-4 font-weight-bold text-white">Test your knowledge in a quiz game for the gifted.</p>

                                </div>
                            </div>
                            <div className='carousel-item w-100 h-100 text-center'>
                                <div className="d-flex justify-content-center align-items-center ">
                                    <p className="display-4 font-weight-bold text-white">See your statistics and results.</p>

                                </div>
                            </div>
                            <div className='carousel-item w-100 h-100 text-center'>
                                <div className="d-flex justify-content-center align-items-center">
                                    <p className="display-4 font-weight-bold text-white">Post your own activities for other to play with.</p>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='text-center my-2'>
                        <Link to='/account/login' className='btn btn-success btn-lg'>Login Now</Link>
                    </div>
                </div>
            </div>
            )
    }
}
