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
1. label: The label above the dropdown that explains its purpose for improved accessablity.
2. value: The internal value(s) of the selected item(s), hidden from the users.
3. multiple: Determines whether multiple items can be selected at the same time, default to false. 
Multiple also enables an additional options "ALL" that allows user to select/deselect all items.
4. onChange: The callback function fired when the selection changes.\
function(value: number | string | array) => void
5. onItemClick: the additional callback passed to the item for extended actions defined by developers. 
It takes an object with three properties: the internal value of the option clicked, the displayed text of the option clicked, and the previouly selected values.\
function(Object: {value: number | string, displayedText: number | string, prevSelection: number | string | array}) => void
6. sortBy: 'value' or 'text', the parameter used to sort the options, either the internal value or the displayed text, default to value.
7. compare: the compare function used to sort the options, if not provided then sort acsending or alphabetically.\
function(a: number | string, b: number | string) => 1 | 0 | -1
8. disabled: When set to true, the dropdown becomes disabled and ignores all user interactions, default to false.
9. dark: When set to true, the dropdown will be rendered with a dark theme, default to false.
10. children: The options within the dropdown, must wirtten as the <Dropdown.Item /> component.
### States:
1. focus: determine if the dropdown is on focus. The options are only visible when focus === true.

### Dropdown.Item
#### Props:
1. value: the internal value of the item that is not displayed to the users.
2. children: the label of the option that is visible to the users. Children can only be string or number.
3. disabled: when set to true, the option becomes disabled and ignores all user interactions, default to false.

4. _onItemClick: the callback function passed to the item fired on item click.\
function(value: string | number) => void
5. _selected: determines whether the option should appear checked.
6. _checkBox: determines whether the option should come with a disk or a checkBox.
#### Note:
Among the props above, _onItemClick, _selected, and _checkbox are handled automatically by the parent Dropdown component, and developers should not manipulate them directly. To add additional function to the click action, please use onItemClick in the Dropdown component.

## Features & Design

### Features

1. Multiple Select: the dropdown can be used for both single or mulitple selection purpose.
2. Select All: in the multiple select mode, users are allowed to select/deselect all by clicking on the additional "ALL" item.
3. Sort: the dropdown allows users to pass in their own compare function and the sort-by parameter to sort the options. This function is intended for occassions when a large number of unsorted options are imported from an external source and mapped into the component.
4. Disabled Dropdown/Options: users are allowed to disable a dropdown or individual options within one.

### Design
1. Dark Mode: this UI component comes with a dark theme, a feature that has gained its popularity among many user interfaces.
2. Transparency: this UI components comes with a translucent background that mimics the frosted glass effect, which brings an elegant yet light-weighted look.
3. Responsiveness: after extensive testing on different broswers, this UI component proves to fully function on both desktop and mobile devices.
4. Accessibility: this UI component uses aria-labels for improved accessibility.

## Future Steps
1. Add support for the keyboard search function to mimic the native HTML select.
2. Add support for option grouping.

## Insight
I drew most of my inspirations from the UI component libraries and user interfaces that I frequently use, such as Material UI Sematic UI, and IOS. Trivial as a dropdown is, it can take tremendous amount of efforts in both design and programming in order to get closer to perfection.