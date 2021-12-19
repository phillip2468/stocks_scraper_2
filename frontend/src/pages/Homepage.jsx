import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import Header from "../components/Header";
import MUIDataTable from "mui-datatables";

const Homepage = () => {

    const [trendingStocks, setTrendingStocks] = useState([]);

    const columnsDefitions = [
        {name: 'symbol', label: 'Ticker symbol'},
        {name: 'regularMarketPrice', label: 'Price'},
        {name: 'regularMarketDayHigh', label: 'High price'},
        {name: 'regularMarketDayLow', label: 'Low price'},
        {name: 'regularMarketChange', label: 'Change %'},
        {name: 'marketCap', label: 'Market cap'},
    ]


    useEffect(() => {
        console.log('Mounted!')
    }, [])

    useEffect(() => {
        fetch('/trending-tickers')
            .then((res) => res.json())
            .then((res) => {
                setTrendingStocks(Object.values(res))
            })
    }, [])


    return (
        <>
            <Header/>
            <Container>
                <MUIDataTable
                    title={"Trending stocks today"}
                    data={trendingStocks}
                    columns={columnsDefitions}
                    options={{
                        download: false,
                        print: false,
                        search: false,
                        selectableRowsHeader: false,
                        sortFilterList: false,
                        viewColumns: false,
                        sort: false,
                        selectableRows: 'none',
                        rowHover: false,
                        pagination: false,
                        fixedSelectColumn: false,
                        fixedHeader: false,
                        filterArrayFullMatch: false,
                        filter: false
                        }
                    }/>
            </Container>
        </>

    )
}

export default Homepage;