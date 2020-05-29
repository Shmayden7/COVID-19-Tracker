import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { countries, fetchCountries } from '../../api/';

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleCountryChange }) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setFetchedCountries]);
    //the second arg passed will make it so that useEffect will only activate
    // if setFetchedCountries changes then the entire function will run


    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(event)=> handleCountryChange(event.target.value)}>
                <option value='global'>Global</option>
                {fetchedCountries.map((country, i) => 
                    <option key={i} value={country}>{country}</option>
                )}
            </NativeSelect>
        </FormControl>
    )
}
export default CountryPicker;