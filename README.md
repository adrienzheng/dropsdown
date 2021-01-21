# Run the project
1. Run
```
cd dropdown
```
2. Run
```
yarn install
```
3. Run 
```
yarn start
```
4. In your browser, go to localhost://3000

# About the project
## Intro
Dropdown is a controlled component with a sub-component Dropdown.Item.

## Components

### Dropdown
#### Props:
1. label: The label above the dropdown that explains its purpose, optional (intended for improved accessablity).
2. value: The internal value(s) of the selected item(s), hidden from the users.
3. multiple: Determines whether multiple items can be selected at the same time, default to false. 
Multiple also enable an additional options "ALL" that allows user to select/deselect all items.
4. onChange: The callback function fired when the selection changes. function(value: number | string | array) => void
5. onItemClick: the additional callback passed to the item for extended actions defined by developers. 
It takes an object with three properties: the internal value of the option clicked, the displayed text of the option clicked, and the previouly selected values.\
function(Object: {value: number | string, displayedText: number | string, prevSelection: number | string | array}) => void
6. sortBy: 'value' or 'text', the parameter used to sort the options, either the internal value or the displayed text, default to value.
7. compare: the compare function used to sort the options, if not provided then sort acsending or alphabetically.\
function(a: number | string, b: number | string) => 1 | 0 | -1
8. disabled: When set to true, the dropdown becomes disabled and ignores all user interactions, default to false.
9. dark: When set to true, the dropdown will be rendered with a dark theme, default to false.
10. children: The options within the dropdown, must wirtten as the <Dropdown.Item /> component.