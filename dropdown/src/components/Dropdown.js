import {useState, useEffect, useRef, useMemo, useCallback, memo} from 'react'
import {CSSTransition} from 'react-transition-group'

import '../styles/Dropdown.scss'

export default function Dropdown({label, value, multiple, children, onChange, dark, disabled, onItemClick, sortBy, compare}) {

  //The Dropdown is a controlled component, which takes following props:
  //label: The label above the dropdown that explains its purpose for improved accessablity.
  //value: The internal value(s) of the selected item(s), hidden from the users.
  //multiple: Determines whether multiple items can be selected at the same time, default to false.
  //          Multiple also enables an additional options "ALL" that allows user to select/deselect all items.
  //onChange: The callback function fired when the selection changes. function(value: number | string | array) => void
  //onItemClick: the additional callback passed to the item for extended actions defined by developers.
  //             It takes an object with three properties: 
  //             the internal value of the option clicked, the displayed text of the option clicked, and the previouly selected values.
  //             function(Object: {value: number | string, displayedText: number | string, prevSelection: number | string | array}) => void
  //sortBy: 'value' or 'text', the parameter used to sort the options, either the internal value or the displayed text, default to 'value'.
  //compare: the compare function used to sort the options, if not provided then sort acsending or alphabetically.
  //         function(a: number | string, b: number | string) => 1 | 0 | -1
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
      if(dropdown.current && !dropdown.current.contains(event.target)) {
        setFocus(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdown])

  const _handleItemClick = useCallback((newValue) => {
    // the callback function passed to each option that updates the selection whenever it is clicked
    // it will then call the onChange callback to inform the parent component that the selection has changed
    if(onChange !== undefined) {
      onChange(newValue)
    }
  }, [onChange])

  const handleItemClick = useCallback((val, text) => {
    // the callback function passed to each option that handles the additional actions defined by developers in the props
    onItemClick({value: val, displayedText: text, prevSelection: value})
  }, [onItemClick, value])

  const sort = (children, sortBy, compare) => { //sorts the options with the sortBy and compare props
    console.log('sort')
    let sorted = [...children]
    let sb = sortBy === 'value' ? 'value' : 'children'
    if(compare && sortBy) {
      return sorted.sort((a, b) => compare(a['props'][sb], b['props'][sb]))
    } else if(compare) {
      return sorted.sort((a, b) => compare(a.props.value, b.props.value))
    } else if(sortBy) {
      return sorted.sort((a, b) => a['props'][sb] > b['props'][sb] ? 1:-1)
    } else {
      return children
    }
  }

  const sorted = useMemo(() => {
    return sort(children, sortBy, compare)
  }, [children, sortBy, compare])

  const selectAll = () => { //Selects all available options
    let ar = []
    children.forEach(({props}) => {
      if (!props.disabled) {
        ar.push(props.value)
      }
    })
    onChange(ar)
  }

  const deselectAll = () => { //Deselects all options
    onChange([])
  }

  const allSelected = () => { //determine if all options are selected
    if(children.filter(child => {
      if(!child.props.disabled) {
        return true
      }
      return false
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
            {sorted.map(({props}) => 
              <Dropdown.Item
                {...props}
                key={props.value}
                onItemClick={onItemClick ? handleItemClick : undefined}
                _onItemClick={_handleItemClick}
                _selected={multiple ? value.includes(props.value) : props.value === value}
                _checkBox={multiple}
              />
            )}
          </ul>
        </CSSTransition>
      </div>
    </div>
  )
}

Dropdown.Item = memo(({value, children, disabled, onItemClick, _onItemClick, _selected, _checkBox}) => {
  //Dropdown.Item is a controlled component that renders the individual option within the dropdown.
  //It takes the following props:
  //value: the internal value of the item that is not displayed to the users.
  //children: the label of the option that is visible to the users. Children can only be string or number.
  //disabled: when set to true, the option becomes disabled and ignores all user interactions, default to false.

  //_onItemClick: the callback function passed to the item fired on item click.
  //              function(value: string | number) => void
  //_selected: determines whether the option should appear checked.
  //_checkBox: determines whether the option should come with a disk or a checkBox.

  //among the props above, _onItemClick, _selected, and _checkbox are handled automatically by the parent Dropdown component, and developers should not manipulate them directly.
  //to add additional function to the click action, please use onItemClick in the Dropdown component.
  const handleClick = () => { //fired when the item is clicked, whil call both _onItemClick and onItemclick passed by the parent Dropdown component.
    _onItemClick(value)
    onItemClick && onItemClick(value, children)
  }

  console.log("render")

  return (
    <li className={`option ${disabled ? "disabled" : ""}`}
      value={value}
      onClick = {handleClick}
    >
      <div>{children}</div>
      <div className={`disc ${_checkBox ? "square" : "" } ${_selected ? "selected" : ""}`}>
        <div className="disc-dot"></div>
      </div>
    </li>
  )
})