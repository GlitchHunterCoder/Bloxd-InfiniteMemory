# Bloxd-InfiniteMemory
> [!WARNING]
> This is experimental code and may break without warning in future updates
>
> this will be updated when it does break and more info will be posted when found
## What it solves
In bloxd there is commonly a out of memory error that appears when too much data is stored
This system can resolve out of memory errors and has a theoretical maximum of
**3 GB** storage as of latest estimationa

## Usage
```js
let a = IM.set(1234)
let b = IM.set(456)
console.log(a,b)
console.log(IM.get(a))
console.log(IM.length())
```
