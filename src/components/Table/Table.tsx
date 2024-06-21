import { useState } from 'react'
import { Table as BootstrapTable, Form, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { capitalize } from '../../utils'
import { Data } from '../../types'

export type TableProps = {
  rows: Data
}

export const Table = ({ rows }: TableProps) => {
    const [sortedRows, setRows] = useState(rows)
    const [order, setOrder] = useState('asc')
    const [sortKey, setSortKey] = useState(Object.keys(rows[0])[0])
  
    const formatEntry = (entry: string | number | boolean) => {
      if (typeof entry === 'boolean') {
        return entry ? '✅' : '❌'
      }
      return entry
    }
  
    const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
  
      if (value) {
        setRows([ ...rows.filter(row => {
          return Object.values(row)
            .join('')
            .toLowerCase()
            .includes(value.toLowerCase())
        }) ])
      } else {
        setRows(rows)
      }
    }
  
    const sort = (value: keyof Data[0], order: string) => {
      const returnValue = order === 'desc' ? 1 : -1
  
      setSortKey(value)
      setRows([ ...sortedRows.sort((a, b) => {
        return a[value] > b[value]
          ? returnValue * -1
          : returnValue
      }) ])
    }
  
    const updateOrder = () => {
      const updatedOrder = order === 'asc' ? 'desc' : 'asc'
      setOrder(updatedOrder)
      sort(sortKey as keyof Data[0], updatedOrder)
    }
  
    return (
      <Container fluid>
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Filter items"
              onChange={filter}
            />
          </Col>
          <Col>
            <Form.Select onChange={(event) => sort(event.target.value as keyof Data[0], order)}>
              {Object.keys(rows[0]).map((entry, index) => (
                <option value={entry} key={index}>
                  Order by {capitalize(entry)}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Button variant="secondary" onClick={updateOrder}>
              Switch order ({order})
            </Button>
          </Col>
        </Row>
        <BootstrapTable striped bordered hover>
          <thead>
            <tr>
              {Object.keys(rows[0]).map((entry, index) => (
                <th key={index}>{capitalize(entry)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((entry, columnIndex) => (
                  <td key={columnIndex}>{formatEntry(entry)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </BootstrapTable>
        {!sortedRows.length && (
          <h1 className="text-center mt-3">No results... Try expanding the search</h1>
        )}
      </Container>
    )
  }
  