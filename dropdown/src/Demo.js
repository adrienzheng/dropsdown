import {useState} from 'react'
import Dropdown from './components/Dropdown'

import './styles/Demo.scss'

function Demo() {
  const [year, setYear] = useState(null)
  const [states, setStates] = useState([])
  const [month, setMonth] = useState(null)
  const [counties, setCounties] = useState([])

  const handleYearChange = (value) => {
    setYear(value)
  }

  const handleStateChange = (value) => {
    setStates(value)
  }

  const handleMonthChange = (value) => {
    setMonth(value)
  }

  const handleCountyChange = (value) => {
    setCounties(value)
  }

  return (
    <div className="App">
      <h1>Dropdown Demo by Adrien Zheng</h1>
      <h2>Light Mode</h2>
      <div className="card light-cont">
        <Dropdown value={year} onChange={handleYearChange} label="Select Year">
          {[1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003].map(year =>
            <Dropdown.Item key={`year-${year}`} value={year}>{year}</Dropdown.Item>
          )}
        </Dropdown>
        <Dropdown
          value={states}
          multiple
          label="Select States"
          onChange={handleStateChange}
          onItemClick={({value, displayedText, prevSelection}) => alert(`you just clicked on the option "${displayedText}" with value ${value}, and your previously selected values are ${prevSelection.join(", ")}`)}
        >
          <Dropdown.Item value={0}>New York</Dropdown.Item>
          <Dropdown.Item value={1}>California</Dropdown.Item>
          <Dropdown.Item value={2} disabled>New Jersey</Dropdown.Item>
          <Dropdown.Item value={3}>Ohio</Dropdown.Item>
        </Dropdown>
        <Dropdown value={null} label="Disabled Dropdown" disabled>
          <Dropdown.Item value={0}>Item 1</Dropdown.Item>
          <Dropdown.Item value={1}>Item 2</Dropdown.Item>
          <Dropdown.Item value={2}>Item 3</Dropdown.Item>
          <Dropdown.Item value={3}>Item 4</Dropdown.Item>
          <Dropdown.Item value={4}>Item 5</Dropdown.Item>
          <Dropdown.Item value={5}>Item 6</Dropdown.Item>
        </Dropdown>  
      </div>
      <h2>Dark Mode</h2>
      <div className="card dark-cont">
        <Dropdown value={month} onChange={handleMonthChange} label="Select Month" dark>
          <Dropdown.Item value={1}>January</Dropdown.Item>
          <Dropdown.Item value={2} disabled>February</Dropdown.Item>
          <Dropdown.Item value={3} disabled>March</Dropdown.Item>
          <Dropdown.Item value={4}>April</Dropdown.Item>
          <Dropdown.Item value={5}>May</Dropdown.Item>
          <Dropdown.Item value={6}>June</Dropdown.Item>
          <Dropdown.Item value={7}>July</Dropdown.Item>
          <Dropdown.Item value={8}>August</Dropdown.Item>
          <Dropdown.Item value={9}>September</Dropdown.Item>
          <Dropdown.Item value={10}>October</Dropdown.Item>
          <Dropdown.Item value={11}>November</Dropdown.Item>
          <Dropdown.Item value={12}>December</Dropdown.Item>
        </Dropdown>
        <Dropdown value={counties} multiple label="Select Counties" onChange={handleCountyChange} dark>
          <Dropdown.Item value={"Alameda County"}>Alameda County</Dropdown.Item>
          <Dropdown.Item value={"Santa Clara County"}>Santa Clara</Dropdown.Item>
          <Dropdown.Item value={"Fresno County"}>Fresno County</Dropdown.Item>
          <Dropdown.Item value={"San Francisco"}>San Francisco</Dropdown.Item>
          <Dropdown.Item value={"Glenn County"}>Glenn County</Dropdown.Item>
        </Dropdown>
        <Dropdown value={counties} multiple label="Select Counties(sorted)" onChange={handleCountyChange} sortBy="text" compare={(a,b) => a>b ? 1 : -1} dark>
          <Dropdown.Item value={"Alameda County"}>Alameda County</Dropdown.Item>
          <Dropdown.Item value={"Santa Clara County"}>Santa Clara</Dropdown.Item>
          <Dropdown.Item value={"Fresno County"}>Fresno County</Dropdown.Item>
          <Dropdown.Item value={"San Francisco"}>San Francisco</Dropdown.Item>
          <Dropdown.Item value={"Glenn County"}>Glenn County</Dropdown.Item>
        </Dropdown>
        <Dropdown value={null} label="Disabled Dropdown" disabled dark>
          <Dropdown.Item value={0}>Item 1</Dropdown.Item>
          <Dropdown.Item value={1}>Item 2</Dropdown.Item>
          <Dropdown.Item value={2}>Item 3</Dropdown.Item>
          <Dropdown.Item value={3}>Item 4</Dropdown.Item>
          <Dropdown.Item value={4}>Item 5</Dropdown.Item>
          <Dropdown.Item value={5}>Item 6</Dropdown.Item>
        </Dropdown>  
      </div>
    </div>
  );
}

export default Demo;
