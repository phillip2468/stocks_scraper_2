import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FetchFunction } from '../../components/FetchFunction'
import { ClientContext } from '../../store/StoreCredentials'
import { Link } from 'react-router-dom'
import TableOfStocks from '../../components/TableOfStocks'

const WatchListPage = () => {
  const [openWLDialog, setOpenWLDialog] = useState(false)

  const [listOfWL, setListOfWL] = useState([])

  const [selectedWL, setSelectedWL] = useState('')

  const [listOfStocks, setListOfStocks] = useState([])

  const { userId } = useContext(ClientContext)

  useEffect(() => {
    if (userId !== null) {
      FetchFunction('GET', `watchlist/${userId}`, null)
        .then(res => setListOfWL(res))
        .catch(error => console.log(error))
    }
  }, [userId])

  useEffect(() => {
    if (selectedWL !== '') {
      FetchFunction('GET', `watchlist/${userId}/${selectedWL}`, null)
        .then(res => setListOfStocks(res))
        .catch(error => console.log(error))
    }
  }, [selectedWL])

  const columns = useMemo(() => {
    return [
      {
        name: 'symbol',
        selector: row => row.stock_details.symbol,
        sortable: true,
        cell: row => <Link target="_blank" to={`/${row.stock_details.symbol}`}>{row.stock_details.symbol}</Link>
      },
      {
        name: 'exchange',
        selector: row => row.stock_details.exchange,
        sortable: true
      },
      {
        name: 'Name',
        selector: row => row.stock_details.stock_name,
        wrap: true,
        sortable: true
      },
      {
        name: 'Last',
        selector: row => row.stock_details.market_current_price,
        sortable: true
      },
      {
        name: 'Currency',
        selector: row => row.stock_details.currency,
        sortable: true
      },
      {
        name: 'Todays change %',
        selector: row => row.stock_details.market_change_percentage,
        sortable: true,
        format: row => (row.stock_details.market_change_percentage * 100).toFixed(2)
      }
    ]
  }, [listOfStocks])

  return (
    <>
      <Grid item>
        <Typography align={'center'} variant={'h5'}>
          Watchlist page
        </Typography>
      </Grid>

      <Grid item>
        <Grid container justifyContent={'center'}>
          <Button onClick={() => setOpenWLDialog(true)} variant={'contained'}>
            Create a new watchlist
          </Button>
        </Grid>
      </Grid>

      <Dialog onClose={() => setOpenWLDialog(false)} open={openWLDialog}>
        <DialogTitle>
          Create a new watchlist
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a title for your watchlist here
          </DialogContentText>

          <TextField autoFocus
                     fullWidth
                     id={'watchlist_name'}
                     label={'Watchlist name'}
                     margin={'dense'}
                     type={'text'}
                     variant={'standard'}/>

          <DialogActions>
            <Button onClick={() => setOpenWLDialog(false)}>Cancel</Button>
            <Button onClick={() => setOpenWLDialog(false)}>Add</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Grid item>
        <Grid container direction={'row'} justifyContent={'center'} spacing={2}>
          <Select
            displayEmpty
            onChange={(e) => setSelectedWL(e.target.value)}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select a portfolio</em>
              }
              return selected
            }}
            sx={{ width: '210px' }}
            value={selectedWL}
            variant={'standard'}
          >
            <MenuItem disabled value="">
              <em>Select...</em>
            </MenuItem>
            {
              listOfWL.map(element =>
                <MenuItem
                  key={element.watchlist_name}
                  value={element.watchlist_name}
                >
                  {element.watchlist_name}
                </MenuItem>
              )}
          </Select>
        </Grid>
      </Grid>

      <Grid item>
        <TableOfStocks columns={columns} data={listOfStocks}/>
      </Grid>

    </>
  )
}

export default WatchListPage
