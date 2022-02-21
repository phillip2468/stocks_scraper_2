import DataTable from 'react-data-table-component'
import * as PropTypes from 'prop-types'
import ListOfTitle from './ListOfTitle/ListOfTitle'

const TableOfStocks = (props) => {
  return <DataTable
    actions={props.actions}
    clearSelectedRows={props.clearSelectedRows}
    columns={props.columns}
    contextActions={props.contextActions}
    data={props.data}
    defaultSortFieldId={'symbol'}
    highlightOnHover={true}
    keyField={'portfolio_id'}
    onSelectedRowsChange={props.onSelectedRowsChange}
    pagination={true}
    pointerOnHover={true}
    selectableRows={true}
    theme={'dark'}
    title={
    <ListOfTitle
      changedValue={props.changedTitle}
      currentValue={`${props.selectedItem}`}
      route={'portfolio'}
      setChangedValue={props.setChangedTitle}
    />}
  />
}

TableOfStocks.propTypes = {
  actions: PropTypes.any,
  clearSelectedRows: PropTypes.bool,
  columns: PropTypes.any,
  contextActions: PropTypes.any,
  data: PropTypes.arrayOf(PropTypes.any),
  onSelectedRowsChange: PropTypes.func,
  selectedItem: PropTypes.string,
  setChangedTitle: PropTypes.func,
  changedTitle: PropTypes.bool
}

export default TableOfStocks
