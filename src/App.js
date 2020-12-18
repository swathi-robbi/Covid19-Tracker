import React from 'react';

import coronaimage from './images/image.png';
// import Cards from './components/Cards/Cards';
// import Chart from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

//index.js in Component folder exports the components.
import { Cards, Chart, CountryPicker} from './components';
import styles from './App.module.css';

import { fetchData } from './api';


class App extends React.Component{

    state = {
        //an empty object - prop
        data: {},
        country: '',
    }
    //lifecycle hook
    //executed after first render only on client side.
    //AJAX/DOM updates occur
    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData });
        
    }

    handleCountryChange =  async (country) => {
        //fetch the data
        //set the state
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
        //console.log(country);
    }
    render(){
        const { data, country } = this.state;

        return( 
            <div className={styles.container}> 
                <img className={styles.image} src={coronaimage}/>
                <Cards data={data} />
                {/* <Cards data={this.state.data}/> */}
                <CountryPicker handleCountryChange={ this.handleCountryChange }/>
                <Chart data={data} country={country}/>

            </div>
        )
    }
}

export default App;