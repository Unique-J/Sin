import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as mainCreators from '../../actions/main';
import { Carousel } from 'react-bootstrap';
import { Login } from '../index';
import Helmet from 'react-helmet';
import config from '../../config';
import { FirstMainPage } from '../../components/index';

@connect(
  state => ({
    user: state.async.user,
    main: state.main
  }),
  mainCreators
)
class Main extends Component {
  static propTypes = {
    user: PropTypes.any,
    main: PropTypes.any,
    addActiveIndex: PropTypes.func.isRequired,
    subtractActiveIndex: PropTypes.func.isRequired,
    changeScrollState: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const carouselNode = this.refs.carousel;
    if (!carouselNode) return;

    const {
      addActiveIndex,
      subtractActiveIndex,
      changeScrollState,
    } = this.props;

    carouselNode.onmousewheel = e => {
      const { main } = this.props;

      if (main.scrollState) {
        changeScrollState();

        if (e.wheelDelta < 0) {
          addActiveIndex();
        } else {
          subtractActiveIndex();
        }

        setTimeout(() => changeScrollState(), 1000);
      }
    };

    window.onkeydown = e => {
      // Press Right Key
      if (e.keyCode === 39) {
        addActiveIndex();
      }
      // Press Left Key
      if (e.keyCode === 37) {
        subtractActiveIndex();
      }
    };
  }

  render() {
    const styles = require('./Main.scss');
    const { user, main } = this.props;
    return (
      <div>
        <Helmet {...config.app.head} />
        {!user &&
        (<div ref="carousel">
          <img src="/StockSnap_01.jpg" alt="background" className={styles.bg_img}/>
          <Carousel
            className={styles.carousel}
            controls={false}
            activeIndex={main.activeIndex}
          >
            <Carousel.Item>
              <FirstMainPage />
            </Carousel.Item>
            <Carousel.Item>
              <Login />
            </Carousel.Item>
          </Carousel>
        </div>)}
      </div>
    );
  }
}

export default Main;
