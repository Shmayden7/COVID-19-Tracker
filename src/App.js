import React from 'react';

import {Cards, Chart, CountryPicker} from './components'
import {fetchData} from './api/index';
import styles from './App.module.css';

import coronaImage from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    };

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    };

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data: fetchedData, country: country});
        // first fetch the data
        //then set the state
    };

    render(){
        const { data, country } = this.state; 
        return (
            <div className={styles.container}>
                <img src={coronaImage} className={styles.image} alt='COVID-19' />
                <Cards country={this.state.country} data={this.state.data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        );
    };
};
export default App;