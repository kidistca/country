import React, { Component } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import CountryView from "./views/countryDetail";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null
    };
    this.sortByName = this.sortByName.bind(this);
    this.sortByPopulation = this.sortByPopulation.bind(this);
  }

  sortByName() {
    const countries = this.state.countries;
    const sortedCountries = countries.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    this.setState({
      countries: sortedCountries
    });
  }

  sortByPopulation() {
    const countries = this.state.countries;
    const sortedCountries = countries.sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
    this.setState({
      countries: sortedCountries
    });
  }

  componentDidMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        // console.log(response.data);
        this.setState({
          countries: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const listCountries = this.state.countries;
    return (
      (!listCountries && (
        <div>
          <h1>Loading...</h1>
        </div>
      )) || (
        <Container>
          <Navbar style={{ backgroundColor: "#00a0d7" }} className="mb-3">
            <h1 className="white">Countries</h1>
          </Navbar>
          <Button
            variant="outline-dark"
            className="mb-3 mr-3"
            onClick={this.sortByName}
          >
            Sort by Country Name
          </Button>
          <Button
            variant="outline-dark"
            className="mb-3"
            onClick={this.sortByPopulation}
          >
            Sort by Population
          </Button>
          <Row>
            <div className="col-5 scroller">
              {listCountries.map(countries => (
                <ListGroup key={countries.alpha3Code}>
                  <ListGroup.Item>
                    <img
                      src={countries.flag}
                      alt="flag"
                      width="70"
                      className="mr-3"
                    ></img>
                    <Link
                      className="text-color"
                      to={`/country/${countries.alpha3Code}`}
                    >
                      {countries.name}
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>
            <div className="col-7">
              <Switch>
                <Route
                  path="/country/:code"
                  render={props => (
                    <CountryView {...props} listCountries={listCountries} />
                  )}
                />
              </Switch>
            </div>
          </Row>
        </Container>
      )
    );
  }
}
