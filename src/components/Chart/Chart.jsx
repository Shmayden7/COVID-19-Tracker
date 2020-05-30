import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: {confirmed, recovered, deaths}, country }) => {
   const [dailyData, setDailyData] = useState([]);

   useEffect(() => {
      // this will find info from API and setState
      const fetchAPI = async () => {
         //finds the data from the API call
         const dailyData = await fetchDailyData();
         //sets state
         setDailyData(dailyData);


      };
        //getting the inner function to call itself
        fetchAPI();
   }, []);
   // the array at the end makes the useEffect behave like 
   // a componentDidMount() and only runs once

   const lineChart = (
       // this is a conditional, it does the same thing as an if()
       dailyData.length ? (
           <Line data={{
               labels: dailyData.map(({ date }) => date),
               datasets: [{
                   data: dailyData.map(({ confirmed }) => confirmed),
                   label: 'Infected',
                   borderColor: '#3333ff',
                   fill: true,
               },{
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true,
               }],
           }} />
       ) : null
   );


   const barChart = (
       confirmed ? (
           <Bar data={{
               labels: ['Infected', 'Recovered', 'Deaths'],
               datasets: [{
                   label: 'People',
                   backgroundColor: [
                       'rgba(0,0,225, 0.5)',
                       'rgba(0,255,0, 0.5)',
                       'rgba(255,0,0, 0.5)',
                   ],
                   data: [confirmed.value, recovered.value, deaths.value],
               }]
           }} options={{
               legend: {display: false},
               title: {display: true, text: `Current state in ${country}`},

           }}/> 
       ) : null

   )

   return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
   );
};
export default Chart;
