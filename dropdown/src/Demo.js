import {useReducer} from 'react'
import Dropdown from './components/Dropdown'

import './styles/Demo.scss'

function Demo() {
  const [year, setYear] = useReducer(reducer1, null)
  const [states, setStates] = useReducer(reducer2, [])
  const [month, setMonth] = useReducer(reducer1, null)
  const [counties, setCounties] = useReducer(reducer2, [])

  function reducer1(oldValue, newValue) {
    if (oldValue === newValue) return null
    return newValue
  }

  function reducer2(ar, value) {
    let rtn = []
    let exist = false
    ar.forEach(item => {
      if(item === value) {
        exist = true
      } else {
        rtn.push(item)
      }
    })
    if(!exist) rtn.push(value)
    return rtn
  }

  return (
    <div className="App">
      <h1>Dropdown Demo by Adrien Zheng</h1>
      <h2>Light Mode</h2>
      <div className="card light-cont">
        <Dropdown value={year} onChange={setYear} label="Select Year">
          {yearItems}
        </Dropdown>
        <Dropdown
          value={states}
          multiple
          label="Select States"
          onChange={setStates}
          onItemClick={handleItemClick}
        >
          {stateItems}
        </Dropdown>
        <Dropdown value={null} label="Disabled Dropdown" disabled>
          {items}
        </Dropdown>  
      </div>
      <h2>Dark Mode</h2>
      <div className="card dark-cont">
        <Dropdown value={month} onChange={setMonth} label="Select Month" dark>
          {monthItems}
        </Dropdown>
        <Dropdown value={counties} multiple label="Select Counties" onChange={setCounties} dark>
          {countyItems}
        </Dropdown>
        <Dropdown value={counties} multiple label="Select Counties(sorted)" onChange={setCounties} sortBy="text" compare={alphabeticalCompare} dark>
          {countyItems}
        </Dropdown>
        <Dropdown value={null} label="Disabled Dropdown" disabled dark>
          {items}
        </Dropdown>  
      </div>
    </div>
  );
}

const alphabeticalCompare = (a,b) => a>b ? 1 : -1

const yearItems = [1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003].map(year =>
  <Dropdown.Item key={`year-${year}`} value={year}>{year}</Dropdown.Item>
)

const stateItems = [
  <Dropdown.Item key={0} value={0}>New York</Dropdown.Item>,
  <Dropdown.Item key={1} value={1}>California</Dropdown.Item>,
  <Dropdown.Item key={2} value={2} disabled>New Jersey</Dropdown.Item>,
  <Dropdown.Item key={3} value={3}>Ohio</Dropdown.Item>
]

const monthItems = [
  <Dropdown.Item key={1} value={1}>January</Dropdown.Item>,
  <Dropdown.Item key={2} value={2} disabled>February</Dropdown.Item>,
  <Dropdown.Item key={3} value={3} disabled>March</Dropdown.Item>,
  <Dropdown.Item key={4} value={4}>April</Dropdown.Item>,
  <Dropdown.Item key={5} value={5}>May</Dropdown.Item>,
  <Dropdown.Item key={6} value={6}>June</Dropdown.Item>,
  <Dropdown.Item key={7} value={7}>July</Dropdown.Item>,
  <Dropdown.Item key={8} value={8}>August</Dropdown.Item>,
  <Dropdown.Item key={9} value={9}>September</Dropdown.Item>,
  <Dropdown.Item key={10} value={10}>October</Dropdown.Item>,
  <Dropdown.Item key={11} value={11}>November</Dropdown.Item>,
  <Dropdown.Item key={12} value={12}>December</Dropdown.Item>
]

const items = [
  <Dropdown.Item key={0} value={0}>Item 1</Dropdown.Item>,
  <Dropdown.Item key={1} value={1}>Item 2</Dropdown.Item>,
  <Dropdown.Item key={2} value={2}>Item 3</Dropdown.Item>,
  <Dropdown.Item key={3} value={3}>Item 4</Dropdown.Item>,
  <Dropdown.Item key={4} value={4}>Item 5</Dropdown.Item>,
  <Dropdown.Item key={5} value={5}>Item 6</Dropdown.Item>
]

const countyItems = [
  <Dropdown.Item key={0} value={"Alameda County"}>Alameda County</Dropdown.Item>,
  <Dropdown.Item key={1} value={"Santa Clara County"}>Santa Clara</Dropdown.Item>,
  <Dropdown.Item key={2} value={"Fresno County"}>Fresno County</Dropdown.Item>,
  <Dropdown.Item key={3} value={"San Francisco"}>San Francisco</Dropdown.Item>,
  <Dropdown.Item key={4} value={"Glenn County"}>Glenn County</Dropdown.Item>
]

const handleItemClick = ({value, displayedText, prevSelection}) => alert(`(Additional Action) You just clicked on the option "${displayedText}" with value ${value}, and your previously selected values are ${prevSelection.join(", ")}`)
export default Demo;
