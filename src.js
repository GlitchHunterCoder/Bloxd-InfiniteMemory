IM = new class {
  constructor(){
    this.CAPS = [3, 12137, 27311]
    this.BITS = this.CAPS.map(e => Math.floor(Math.log2(e)))
    this.CELL_SIZE = 64
    this.mem = []
  }

  binToNum(bin) {
    if (typeof bin == "number") { return bin }
    
    const bytes = new Uint8Array(8)
    const chunks = bin.match(/.{8}/g)
    chunks.reverse().forEach((chunk, i) => bytes[i] = parseInt(chunk, 2))

    const view = new Float64Array(bytes.buffer)
    return view[0]
  }
  
  numToBin(num) {
    if (typeof num == "string") { return num.padStart(this.CELL_SIZE, '0') }

    const buf = new ArrayBuffer(8)
    const view = new Float64Array(buf)
    view[0] = num

    return [...new Uint8Array(buf)]
      .reverse()
      .map(b => b.toString(2).padStart(8, '0'))
      .join('')
  }

  decode(addr) {
    const bin = this.numToBin(addr)
    let offset = 0
    return this.BITS.map(e => parseInt(bin.slice(offset, offset += e), 2))
  }

  write(addr, binValue) {
    const [l1, l2, l3] = this.decode(addr);
    ((this.mem[l1] ??= [])[l2] ??= [])[l3] = this.binToNum(binValue)
    return addr
  }
  
  read(addr) {
    const [l1, l2, l3] = this.decode(addr)
    const val = this.mem[l1]?.[l2]?.[l3] ?? 0
    return this.numToBin(val)
  }
  
  bitWrite(bitAddr, bitCount, binValue) {
      const bits = this.numToBin(binValue)
          .padStart(bitCount, '0')
          .slice(-bitCount)
      
      let cellAddr = bitAddr >> Math.log2(this.CELL_SIZE)
      let bitOffset = bitAddr & (this.CELL_SIZE - 1)
      let written = 0
    
      while (written < bitCount) {
        const bitsInCell = Math.min(this.CELL_SIZE - bitOffset, bitCount - written)
        const chunk = bits.slice(written, written + bitsInCell)
    
        const cell = this.read(cellAddr)
        const masked = cell.slice(0, bitOffset) + chunk + cell.slice(bitOffset + bitsInCell)
        this.write(cellAddr, masked)
    
        written += bitsInCell
        bitOffset = 0
        cellAddr++
      }
  }
  
  bitRead(bitAddr, bitCount) {
    let cellAddr = bitAddr >> Math.log2(this.CELL_SIZE)
    let bitOffset = bitAddr & (this.CELL_SIZE - 1)
    let bits = ''
  
    while (bits.length < bitCount) {
      const bitsInCell = Math.min(this.CELL_SIZE - bitOffset, bitCount - bits.length)
      bits += this.read(cellAddr).slice(bitOffset, bitOffset + bitsInCell)
      bitOffset = 0
      cellAddr++
    }
  
    return bits
  }
}





