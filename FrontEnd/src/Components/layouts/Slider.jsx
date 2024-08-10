import Slider from 'react-slick';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToScroll: 1,
                dots: false
            }
        }
    ]
};

const HeroSlider = () => {
    return (
        <div className="hero-slider">
            <Slider {...settings} >
                <div >
                    <img className='img-cus' src="http://localhost:3000/images/hero_1.png" alt="Slide 1" />
                </div>
                <div>
                    <img className='img-cus' src="http://localhost:3000/images/hero_2.png" alt="Slide 2" />
                </div>
                <div >
                    <img className='img-cus' src="http://localhost:3000/images/hero_3.png" alt="Slide 3" />
                </div>
            </Slider>
        </div>
    );
};

export default HeroSlider;
