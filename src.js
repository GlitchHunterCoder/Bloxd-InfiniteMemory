IM = new class {
  constructor() {
    this.NEST_SIZE = 3;
    this.indices = Array(this.NEST_SIZE).fill(0);
    this.inx = 0
    this.mem = [];
  }

  set(value) {
    while (true) {
      try {
        let current = this.mem;
        for (let level = 0; level < this.NEST_SIZE - 1; level++) {
          let key = this.indices[level];
          current[key] ??= [];
          current = current[key];
        }
        let finalKey = this.indices[this.NEST_SIZE - 1];
        current[finalKey] = value;
        this.inx++
        let keyCopy = [...this.indices];
        this.indices[this.NEST_SIZE - 1]++;
        return keyCopy;
      } catch (e) {
        for (let level = this.NEST_SIZE - 1; level >= 0; level--) {
          this.indices[level] = 0;
          if (level - 1 >= 0) {
            this.indices[level - 1]++;
            break;
          }
        }
      }
    }
  }

  get(key) {
    let current = this.mem;
    for (let i = 0; i < key.length; i++) {
      current = current?.[key[i]];
      if (current === undefined) return undefined;
    }
    return current;
  }
  
  toNum(key) {
    let sizes = []
    let current = this.mem
  
    // collect page sizes per level
    for (let i = 0; i < this.NEST_SIZE; i++) {
      sizes[i] = current.length
      current = current[0]
    }
  
    let num = 0
    for (let i = 0; i < this.NEST_SIZE; i++) {
      num *= (sizes[i] || 1)
      num += key[i]
    }
  
    return num
  }

  toKey(num) {
    if(num>=this.inx){return void 0}
    let sizes = []
    let current = this.mem
  
    for (let i = 0; i < this.NEST_SIZE; i++) {
      sizes[i] = current.length
      current = current[0] ?? []
    }
  
    let mult = Array(this.NEST_SIZE)
    mult[this.NEST_SIZE - 1] = 1
    for (let i = this.NEST_SIZE - 2; i >= 0; i--) {
      mult[i] = mult[i+1] * sizes[i+1]
    }
  
    let key = Array(this.NEST_SIZE)
    for (let i = 0; i < this.NEST_SIZE; i++) {
      key[i] = Math.floor(num / mult[i])
      num = num % mult[i]
    }
  
    return key
  }

  length(){
    return this.inx
  }
};
