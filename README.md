# Bloxd-InfiniteMemory
> [!WARNING]
> This is experimental code and may break without warning in future updates

## What it solves
In Bloxd there is a common out of memory error that appears when too much data is stored.
This system resolves that by packing data into a 3-level hierarchical binary memory field,
giving access to a much larger theoretical maximum than native storage.

## How it works
Memory is organised as a 3-level array addressed by a single binary address string or number.
Each cell stores ~~32 bits of raw binary data~~ (NOW **64 BITS**, thanks to TypedArray conversions to interact with IEEE 754 standards), and the `bitWrite`/`bitRead` functions allow
writing and reading arbitrary bit counts across cell boundaries, making the whole field
behave as one continuous flat bit field.

## Memory Maximum
The three levels have capacities of `2 × 8192 × 16384` cells, each holding 64 bits:

```js
2 * 8192 * 16384 * 64 = 17,179,869,184 bits // ~2 GB
```

## API

### Cell-level (64 bit)
```js
IM.write(addr, binValue) // write 64 bits to a cell address (float or binary string)
IM.read(addr)            // read 64 bits from a cell address, returns binary string
```

### Bit-level (arbitrary width)
```js
IM.bitWrite(bitAddr, bitCount, binValue) // write bitCount bits starting at global bit index
IM.bitRead(bitAddr, bitCount)            // read bitCount bits starting at global bit index
```

Bit operations handle cell boundary spillover automatically, so you never have to think about 64-bit alignment.

### Utilities
```js
IM.binToNum(bin) // binary string or float → float
IM.numToBin(num) // float or binary string → 64-bit padded binary string
IM.decode(addr)  // address → [l1, l2, l3] cell indices
```

## Usage
```js
// cell-level
IM.write(0, 0b10101010);
IM.read(0); // '00000000000000000000000010101010'

// bit-level — store a 5-bit value at bit position 17
IM.bitWrite(17, 5, "10110");
IM.bitRead(17, 5); 

// cross-boundary — 40 bits starting at bit 28, spills across two cells
IM.bitWrite(28, 40, '1111111111111111111111111111111111111111');
IM.bitRead(28, 40); // '1111111111111111111111111111111111111111'
```

## Limitations
- Values larger than 64 bits must be passed as binary strings to `bitWrite`, as JS number precision caps at 64 bits
- No general datatype storage yet — only string as raw binary data, or number as interpreted float
