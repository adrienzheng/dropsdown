import {useState, useEffect, useRef} from 'react'
import {CSSTransition} from 'react-transition-group'

import '../styles/Dropdown.scss'

export default function Dropdown({label, value, multiple, children, onChange, dark, disabled}) {

  //The Dropdown is a controlled component, which takes following props:
  //label: The label above the dropdown that explains its purpose, optional (intended for improved accessablity).
  //value: The internal value(s) of the selected item(s), hidden from the users.
  //multiple: Determines whether multiple items can be selected at the same time, default to false.
  //          Multiple also enable an additional options "ALL" that allows user to select/deselect all items.
  //onChange: The callback function triggered when the selection changes.
  //disabled: When set to true, the dropdown becomes disabled and ignores all user interactions, default to false.
  //dark: When set to true, the dropdown will be rendered with a dark theme, default to false.
  //children: The options within the dropdown, must wirtten as the <Dropdown.Item /> component defined at the end.

  const [focus, setFocus] = useState(false) // state that contorls the visibility of the options, when focus === true, the options show up

  const options = {}
  children.forEach(({props: {value, children}}) => {
    options[value] = children
  }) // turn the children prop into a hashtable (an Object that maps each child's value to its displayed name)

  const dropdown = useRef(null) //ref that points to the ul element that renders all the options

  useEffect(() => {
    //when the options show up, add an event listener to the document, which listens to the next click event outside
    //the ul element that contains all the options so that the options collapes when users click outside.
    function handleClickOutside(event) {
      // event.stopImmediatePropagation()
      if(dropdown.current && !dropdown.current.contains(event.target)) {
        setFocus(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdown])

  const handleItemClick = (newValue) => {
    // the callback function passed to each option that returns the option's value whenever it is clicked
    // it will then call the onChange callback to inform the parent component that the value(s) has changed
    if(onChange !== undefined) {
      if(multiple) {
        // if the dropdown allows multiple selection, return the list of updated selected value
        let ar = []
        let exist = false
        value.forEach(val => {
          if (newValue === val) {
            exist = true
          } else {
            ar.push(val)
          }
        })
        if(!exist) {
          ar.push(newValue)
        }
        onChange(ar)
      } else {
        // otherwise, returns the new value
        onChange(newValue)
      }
    }
  }

  const selectAll = () => {
    let ar = []
    children.forEach(({props}) => {
      if (!props.disabled) {
        ar.push(props.value)
      }
    })
    onChange(ar)
  }

  const deselectAll = () => {
    onChange([])
  }

  const allSelected = () => {
    if(children.filter(child => {
      if(!child.props.disabled) {
        return true
      }
    }).length === value.length) {
      return true
    }
    return false
  }

  return (
    <div ref={dropdown} className={`dropdown ${dark ? 'dark' : 'light'} ${disabled ? 'disabled' : ''}`} onClick={() => setFocus(true)}>
      {label && <label 
        id={label && label.split(' ').join('-')}
        className={((!multiple && value !== null) || (multiple && value.length>0)) ? "floated" : undefined}
      >{label}</label>}
      <div aria-labelledby={label ? label.split(' ').join('-') : undefined} className='input-cont'>
        <input
          value={multiple ? value.map(val => options[val]).join(', ') : (options[value] || "")}
          readOnly
        />
        <svg version="1.1" viewBox="0 0 960 560" className={focus ? 'left' : ''}>
          <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
            c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
            c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
        </svg>
      </div>
      <div>
        <CSSTransition in={focus} timeout={300} classNames="item" unmountOnExit>
          <ul className="options" aria-labelledby={label ? label.split(' ').join('-') : undefined}>
            {multiple && <li className="option all"  onClick={allSelected() ? deselectAll : selectAll}>
              <div>ALL</div>
              <div className={`disc square ${allSelected() ? "selected" : ""}`}>
                <div className="disc-dot"></div>
              </div>
            </li>}
            {children.map(({props}) => {
              return <Dropdown.Item
                {...props}
                key={props.value}
                onItemClick={handleItemClick}
                selected={multiple ? value.includes(props.value) : props.value === value}
                checkBox={multiple}
              />
            })}
          </ul>
        </CSSTransition>
      </div>
    </div>
  )
}

Dropdown.Item = ({value, children, onItemClick, selected, checkBox, disabled}) => {
  //Dropdown.Item is a controlled component that renders the individual option within the dropdown.
  //It takes the following props:
  //value: the internal value of the item that is not displayed to the users.
  //children: the label of the option that is visible to the users.
  //onItemClick: the callback function passed to the item that returns the internal value of the item to the parent dropdown component.
  //selected: determines whether the option should appear checked.
  //checkBox: determines whether the option should come with a disk or a checkBox.
  //disabled: when set to true, the option becomes disabled and ignores all user interactions, default to false.

  //among the props above, onItemClick, selected, and checkbox are handled automatically by the parent Dropdown component, and developers should not manipulate them by providing their own values.

  return (
    <li className={`option ${disabled ? "disabled" : ""}`}
      value={value}
      onClick = {() => onItemClick(value)}
    >
      <div>{children}</div>
      <div className={`disc ${checkBox ? "square" : "" } ${selected ? "selected" : ""}`}>
        <div className="disc-dot"></div>
      </div>
    </li>
  )
}