IM = new class {
  constructor(){
    this.CAPS = [3, 12137, 27311]
    this.BITS = this.CAPS.map(e=>Math.floor(Math.log2(e)))
    this.mem = []
  }

  binToNum(bin) {return typeof bin == "number"? bin: parseInt(bin, 2)}
  
  numToBin(num) {return ( typeof num == "string"? num: (num >>> 0).toString(2) ).padStart(32, '0')}

  decode(addr) {
    const bin = this.numToBin(addr);
    let offset = 0;
    return this.BITS.map(e => parseInt(bin.slice(offset, offset += e), 2));
  }

  write(addr, binValue) {
    const [l1, l2, l3] = this.decode(addr);
    ((this.mem[l1] ??= [])[l2] ??= [])[l3] = this.binToNum(binValue);
    return addr;
  }
  
  read(addr) {
    const [l1, l2, l3] = this.decode(addr);
    const val = this.mem[l1]?.[l2]?.[l3] ?? 0
    return this.numToBin(val);
  }
  
  bitWrite(bitAddr, bitCount, binValue) {
    const bits = this.numToBin(binValue).padStart(bitCount, '0').slice(-bitCount);
    let cellAddr = bitAddr >> 5;
    let bitOffset = bitAddr & 31;
    let written = 0;
  
    while (written < bitCount) {
      const bitsInCell = Math.min(32 - bitOffset, bitCount - written);
      const chunk = bits.slice(written, written + bitsInCell);
  
      const cell = this.read(cellAddr);
      const masked = cell.slice(0, bitOffset) + chunk + cell.slice(bitOffset + bitsInCell);
      this.write(cellAddr, masked);
  
      written += bitsInCell;
      bitOffset = 0;
      cellAddr++;
    }
  }
  
  bitRead(bitAddr, bitCount) {
    let cellAddr = bitAddr >> 5;
    let bitOffset = bitAddr & 31;
    let bits = '';
  
    while (bits.length < bitCount) {
      const bitsInCell = Math.min(32 - bitOffset, bitCount - bits.length);
      bits += this.read(cellAddr).slice(bitOffset, bitOffset + bitsInCell);
      bitOffset = 0;
      cellAddr++;
    }
  
    return bits;
  }
}
