import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx';
import '../dist/styles.css';
import Footer from './components/Footer.jsx';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      currentRestaurant: {},
      nearbyRestaurants: [],
      checkID: true,
      id:document.URL.split('/')[4],
      host:document.URL.split(':')[1]
    }
	}

  componentDidMount() {
    this._getData();
  }

  _getData() {
    // console.log('window location.href: ', window.location.href);
    
    // var id = window.location.href.split('/')[4];
    // console.log('getting recommended restaurants for id: ' + id)

    //error handling if id is included in URL
    if (this.state.id !== undefined) {
      $.ajax({
        url: `http:${this.state.host}:3004/api/restaurants/${this.state.id}/nearby`,
        method: "GET",
        success: (data) => {
          this.setState({
            currentRestaurant: data[0],
            nearbyRestaurants: data[1],
          })
        },
        error: (err) => {
          console.log('GET Error: ', err)
        }
      })
    } else {
      this.setState({
        checkID: false
      })
    }
    
  }

  _goToRestaurant(id) {
    console.log('go to restaurant ' + id)
    location.href = '/restaurants/' + id;
  }

	render() {
    
    let restaurantCards = this.state.nearbyRestaurants.map((num, index) => {
      return (
        <RestaurantCard nearbyRestaurant={this.state.nearbyRestaurants[index]} key={index.toString()} switchRestaurant={this._goToRestaurant.bind(this)} />
      )
    })


		return (
			<div className="nearby-padding">
				<div className="restaurant-header">Restaurants Near {this.state.currentRestaurant.name ? this.state.currentRestaurant.name : "none"}</div>
        <div className="restaurant-cards">
				{restaurantCards}
        </div>
        <Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('nearby-app'));