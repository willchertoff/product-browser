import React, { Component, PropTypes } from 'react';

import './main.css';

/* Functional */
const needData = (data) => !data.length > 0;
const emptyString = (str) => !str.length > 0;
const fetchData = (endpoint, query = '', cb) => {
  fetch(`${endpoint}/products?${query}`)
    .then(response => response.json())
      .then(json => cb(json))
        .catch(e => cb(null, true));
}
const errormsg = () => <p>Sorry, there was an error</p>
const loadmsg = () => 
  <p
    style={{
      textAlign: 'center',
      fontFamily: 'Pacifico',
      fontSize: '2em',
    }}
  >
    Loading
  </p>

/* Product Browser */
class ProductBrowser extends Component {
  static defaultProps = {
  }
  static propTypes = {
    products: PropTypes.array
  }
  constructor(props) {
    super(props)
    this.state = {
      forPerson: '',
      category: '',
      data: [],
      loading: false,
      error: false,
    }
  }
  /* Lifecycle Functions */
  componentDidMount = () => {
    const { data } = this.state;
    const { endpoint } = this.props;
    const { handleResponse } = this;
    if (!needData(data)) {
      return;
    };
    this.setState({
      loading: true,
    })
    fetchData('http://localhost:3000', '', handleResponse);
  }
  componentDidUpdate = (prevProps, prevState) => {
    const { category, forPerson } = this.state;
    const { handleResponse } = this;
    if (category === prevState.category && forPerson === prevState.forPerson) return;
    const categoryQuery = emptyString(category) ? '' : `category=${category}`
    const personQuery = emptyString(forPerson) ? '' : `person=${forPerson}`

    let query = `${categoryQuery}&${personQuery}`;
    this.setState({
      loading: true,
    });
    fetchData('http://localhost:3000', query, handleResponse);
  }
  /* StateChange Functions */
  handleResponse = (data, error = false) => {
    if (error) {
      this.setState({
        error: true,
        loading: false,
      })
    } else {
      this.setState({
        data: data,
        loading: false,
        error: false,
      })
    }
  }
  handlePersonClick = (e) => {
    e.preventDefault();
    this.setState({
      forPerson: e.target.getAttribute('data-value')
    })
  }
  handleCategoryClick = (e) => {
    e.preventDefault();
    this.setState({
      category: e.target.getAttribute('data-value')
    })
  }

  renderContent = () => {
    const { data, loading, error } = this.state;
    if (error) return errormsg();
    if (loading) return loadmsg();
    if (data.length > 0) return products(data);
  }
  render() {
    const { data } = this.state;
    return (
      <div
        style={{
          minHeight: '500px',
        }}
      >
        <PersonFilter
          onClick={this.handlePersonClick}
          value={this.state.forPerson}
        />
        <CategoryFilter
          onClick={this.handleCategoryClick}
          value={this.state.category}
        />
        {this.renderContent()}
      </div>
    )
  }
}

/* Container */
const App = () =>
  <div
    style={{
      margin: 'auto',
      maxWidth: '1000px',
    }}
  >
    <h1
      style={{
        fontFamily: 'Pacifico',
        color: 'white',
        textAlign: 'center',
        fontSize: '4em'
      }}
    >
      Product Browser
    </h1>
    <ProductBrowser />
  </div>

/* Products Container */
const products = (data) =>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flexStart',
      margin: '2em auto',
      maxWidth: '800px'
    }}
  >
    {data.map(p => 
      <Product
        title={p.title}
        person={p.person}
        category={p.category}
        price={p.price}
      />
    )}
  </div>

/* Product Component */
const Product = ({ price, title, person, category }) =>
  <div
    className="product"
    style={{
      padding: '2em',
      background: 'white',
      width: '250px',
      height: '311px',
      marginTop: '20px',
    }}
  >
    <div
    >
      <p style={{textAlign: 'center'}}>{title}</p>
      <p style={{textAlign: 'center'}}>{person}</p>
      <p style={{textAlign: 'center'}}>{category}</p>
    </div>
      <p style={{textAlign: 'center'}}>{`Price: ${price}`}</p>
  </div>

/* Person Filter */
const PersonFilter = (props) =>
  <div
    style={{
      textAlign: 'center'
    }}
  >
    <a className={props.value === '' ? 'active' : ''} onClick={props.onClick} data-value=''>All</a>
    <a className={props.value === 'men' ? 'active' : ''} onClick={props.onClick} data-value='men'>Men</a>
    <a className={props.value === 'women' ? 'active' : ''} onClick={props.onClick} data-value='women'>Women</a>
    <a className={props.value === 'children' ? 'active' : ''} onClick={props.onClick} data-value='children'>Children</a>
  </div>

/* Category Filter */
const CategoryFilter = (props) =>
  <div
    style={{
      textAlign: 'center'
    }}
  >
    <a className={props.value === '' ? 'active' : ''} onClick={props.onClick} data-value=''>All</a>
    <a className={props.value === 'new-arrivals' ? 'active' : ''} onClick={props.onClick} data-value='new-arrivals'>New Arrivals</a>
    <a className={props.value === 'shirts' ? 'active' : ''} onClick={props.onClick} data-value='shirts'>Shirts</a>
    <a className={props.value === 'tees' ? 'active' : ''} onClick={props.onClick} data-value='tees'>Tees</a>
    <a className={props.value === 'sweaters' ? 'active' : ''} onClick={props.onClick} data-value='sweaters'>Sweaters</a>
    <a className={props.value === 'bottoms' ? 'active' : ''} onClick={props.onClick} data-value='bottoms'>Bottoms</a>
  </div>

export default App;
