import {Container, Grid} from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import PopularStocksTable from "../components/PopularStocksTable/PopularStocksTable";
import StockPriceChart from "../components/StockPriceChart/StockPriceCharts";
import {DateTime} from "luxon";
import {useContext, useEffect, useState} from "react";
import {ClientContext} from "../store/StoreCredentials";


const Homepage = () => {

    const listOfData = ['^AXJO', '^GSPC', '^IXIC', 'AUDUSD=X', 'AUDJPY=X']

    const [historicalData, setHistoricalData] = useState(listOfData
        .reduce((acc, curr) => (acc[curr] = [] , acc), {}))

    useEffect(()=> {
        handleGetHistoricalData("1d")
    }, [])

    let {jwt} = useContext(ClientContext)


    const handleGetHistoricalData = (period) => {
        listOfData.map(async (thisElement, index, array) => {
            const result = await fetch(`/quote/${thisElement}&period=${period}&interval=30m`)
            const response = await result.json()
            const key = array[index]
            setHistoricalData(prevState => ({
                ...prevState, [key]: response}
            ))
        })
    }

    const dateFormatter = date => {
        return DateTime.fromHTTP(date).toLocaleString(DateTime.DATETIME_SHORT);
    };

    console.log(jwt)

    return (
        <>
            <Grid item>
                <Grid container direction={"row"}>
                    {Object.keys(historicalData).map(function(key) {
                        return (
                            <div key={key} style={{textAlign: "center"}}>
                                {key}
                                <StockPriceChart
                                    heightOfChart={200}
                                    widthOfChart={230}
                                    historicalData={historicalData[key]}
                                    formatTime={dateFormatter}
                                />
                            </div>
                        )
                    })}
                </Grid>
            </Grid>

            <Grid item sx={{position: "relative"}}>
                <SearchBar placeholder={"Search by stock symbols or company names"}/>
            </Grid>

            <Grid item>
                <Container sx={{width: "52%"}}>
                    <PopularStocksTable/>
                </Container>
            </Grid>
        </>
    )
}

export default Homepage;