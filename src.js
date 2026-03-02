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
  
  length(){
    return this.inx
  }
};
