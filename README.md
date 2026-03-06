# Bloxd-InfiniteMemory
> [!WARNING]
> This is experimental code and may break without warning in future updates
>
> this will be updated when it does break and more info will be posted when found
## What it solves
In bloxd there is commonly a out of memory error that appears when too much data is stored
This system can resolve out of memory errors and has a theoretical maximum which is shown below

## Memory Maximum
i saw that numbers can store `27311` and arrays `12139` so i wondered what happened if i tried storing both kinds in equal amounts

this system can store...
- `27311` `Numbers` per `Array` and
- `12139` `Arrays` before it crashes
27311 number also applies to `Booleans`,`Float/Int`,`Undefined`,`Null`

which suggests to me that im measuring pointer memory usage, not memory usage of the value itself

so to find the total number of those primatives storable it becomes the following

```js
27311 * 12139 = 331,528,229

which is approx 331 MB
```

As of latest estimation, work is continuing to find how memory in bloxd as a whole works, and this value will change alongside it when new information is found

## Limitations
it can only handle primatives not including strings, so if you want to store more complex data types, until support is built in for those, you will only be able to store
- Numbers (Int Or Float)
- Booleans
- Undefined
- Symbol
- Null

## Usage
```js
let a = IM.set(123) //returns 0
let b = IM.set(456) //returns 1

console.log(a,b) //logs 0 1
console.log(IM.get(a)) //logs 123
console.log(IM.length()) //logs 2
```
