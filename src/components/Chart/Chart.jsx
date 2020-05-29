import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = () => {
   const [dailyData, setDailyData] = useState([]);

   useEffect(() => {
      // this will find info from API and setState
      const fetchAPI = async () => {
         //finds the data from the API call
         const dailyData = await fetchDailyData();
         //sets state
         setDailyData(dailyData);


      };
      console.log(dailyData);
        //getting the inner function to call itself
        fetchAPI();
   });

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

   return (
        <div className={styles.container}>
            {lineChart}
        </div>
   );
};
export default Chart;
