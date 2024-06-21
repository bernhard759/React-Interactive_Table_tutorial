import { Table } from './components/Table'
import { data } from './data'

function App() {
  return (
    <div className="App">
      <h1>React Table Tutorial</h1>
      <Table rows={data} />
    </div>
  )
}

export default App
