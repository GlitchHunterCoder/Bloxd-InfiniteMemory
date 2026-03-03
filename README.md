# Bloxd-InfiniteMemory
> [!WARNING]
> This is experimental code and may break without warning in future updates
>
> this will be updated when it does break and more info will be posted when found
## What it solves
In bloxd there is commonly a out of memory error that appears when too much data is stored
This system can resolve out of memory errors and has a theoretical maximum of
**3 GB** storage as of latest estimations and rough calculations

## Limitations
it can only handle primatives not including strings, so if you want to store more complex data types, until support is built in for those, you will only be able to store
- Numbers (Int Or Float)
- Booleans
- Undefined
- Symbol
- Null

## Usage
```js
let a = IM.set(123) //returns [0,0,0]
let b = IM.set(456) //returns [0,0,1]
console.log(a,b) //logs [0,0,0] [0,0,1]
console.log(IM.get(a)) //logs 123
console.log(IM.length()) //logs 2

console.log(IM.toNum(a),IM.toNum(b)) //logs 0 1
console.log(IM.toKey(0),IM.toKey(1)) //[ 0, 0, 0 ] [ 0, 0, 1 ]
```
