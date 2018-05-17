import $ from 'jquery';
import React from 'react';
import RestaurantCard from './components/RestaurantCard.jsx';
import '../dist/styles.css';
import Footer from './components/Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRestaurant: this.props.currentRestaurant || {},
      nearbyRestaurants: this.props.nearbyRestaurants || [],
      checkID: true,
      id: this.props.id || undefined,
    };
  }

  componentDidMount() {
    const client = redis.createClient(6379, '13.57.222.179');
    if (typeof window !== 'undefined') {
      this.setState({ id: window.location.href.split('/')[4] }, this._getData);
    }
  }

  _getData() {
    if ((this.state.id !== undefined) || (this.state.nearbyRestaurants.length === 0)) {
      _checkRedis();
      $.ajax({
        url: `http://52.53.193.160:3004/api/restaurants/${this.state.id}/nearby`,
        method: 'GET',
        success: (data) => {
          this.setState({
            currentRestaurant: data[0],
            nearbyRestaurants: data[1],
          });
        },
        error: (err) => {
          console.log('GET Error: ', err);
        },
      });
    } else {
      this.setState({
        checkID: false,
      });
    }
  }

  _goToRestaurant(id) {
    location.href = `/restaurants/${id}`;
  }

  _checkRedis(id) {
    client.on('connect', function() {
      console.log('connected');
    });
  }

  _addToRedis(data) {
    const dataStr = JSON.stringify(data);
  }

  render() {
    const restaurantCards = this.state.nearbyRestaurants.map((num, index) => (
      <RestaurantCard nearbyRestaurant={this.state.nearbyRestaurants[index]} key={index.toString()} switchRestaurant={this._goToRestaurant.bind(this)} />
    ));


    return (
      <div className="nearby-padding">
        <div className="restaurant-header">Restaurants Near {this.state.currentRestaurant.name ? this.state.currentRestaurant.name : 'none'}</div>
        <div className="restaurant-cards">
          {restaurantCards}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

// if (typeof window !== 'undefined') {
//   ReactDOM.render(<App />, document.getElementById('nearby-app'));
// }
