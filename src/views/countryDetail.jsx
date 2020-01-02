import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import "../App.css";
import ReactMapGL from "react-map-gl";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      viewport: {
        width: 635,
        height: 600,
        latitude: 10,
        longitude: 10,
        zoom: 6
      },
      previousCountryCode: ""
    };
    this.getCountryName = this.getCountryName.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const code = props.match.params.code;
    const countries = props.listCountries;
    const country = countries.find(
      Onecountry => Onecountry.alpha3Code === code
    );
    return {
      ...state,
      country
    };
  }

  getCountryName = borderCode => {
    let countryName = "";
    const countries = this.props.listCountries;
    countries.filter(country => {
      if (borderCode === country.alpha3Code) {
        countryName = country.name;
      }
    });
    return countryName;
  };

  componentDidUpdate() {
    const code = this.props.match.params.code;
    if (this.state.previousCountryCode !== code) {
      this.setState({
        viewport: {
          width: 635,
          height: 600,
          latitude: this.state.country.latlng[0],
          longitude: this.state.country.latlng[1],
          zoom: 6
        },
        previousCountryCode: code
      });
    }
  }

  componentDidMount() {
    const code = this.props.match.params.code;
    if (this.state.previousCountryCode !== code) {
      this.setState({
        viewport: {
          width: 635,
          height: 600,
          latitude: this.state.country.latlng[0],
          longitude: this.state.country.latlng[1],
          zoom: 6
        },
        previousCountryCode: code
      });
    }
  }

  render() {
    const country = this.state.country;
    console.log(country.latlng[0]);
    console.log("viewport", this.state.viewport);
    const MapboxAccessToken =
      "pk.eyJ1Ijoia2lkaXN0IiwiYSI6ImNrNHd3aG93aDBhdHozZG16dHVxbWdkaHAifQ.9pmjUGGJfaM-U3Sr9XlX5g";
    return (
      <div>
        <ListGroup>
          <ListGroup.Item>
            <h1>{country.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6>Capital: {country.capital}</h6>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6>Area: {country.area} km&#178;</h6>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6>Number of inhabitants: {country.population}</h6>
          </ListGroup.Item>
          <ListGroup.Item>
            <h6>Borders -</h6>
            {(country.borders.length &&
              country.borders.map(item => (
                <ul>
                  <Link className="text-color" to={`/country/${item}`}>
                    {this.getCountryName(item)}
                  </Link>
                </ul>
              ))) || <span> No Border</span>}
          </ListGroup.Item>
        </ListGroup>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={MapboxAccessToken}
          mapStyle="mapbox://styles/kidist/ck4x1wvgk0i5v1cnnq4urxqp4"
        />
      </div>
    );
  }
}
