const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.timestamp +
          JSON.stringify(this.data) +
          this.prevHash +
          this.nonce
      )
      .digest('hex');
  }

  mineBlock(difficulty) {
    const target = '0'.repeat(difficulty);
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Block ${this.index} mined: ${this.hash}`);
  }
}

class Blockchain {
  constructor(difficulty = 4) {
    this.difficulty = difficulty;
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), { info: 'Genesis Block' }, '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      this.getLatestBlock().hash
    );
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  validateChain() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // Check 1: stored hash integrity
      if (current.hash !== current.calculateHash()) {
        console.log(`Invalid hash at block ${current.index}`);
        return false;
      }

      // Check 2: prev-hash linkage
      if (current.prevHash !== previous.hash) {
        console.log(`Broken chain link at block ${current.index}`);
        return false;
      }
    }
    return true;
  }
}

// ---- Test the chain ----
const myChain = new Blockchain(4); // difficulty = 4 leading zeros

console.log('Mining block 1...');
myChain.addBlock({ from: 'Dev', to: 'Alex', amount: 50 });

console.log('Mining block 2...');
myChain.addBlock({ from: 'Alex', to: 'Sam', amount: 25 });

console.log('Mining block 3...');
myChain.addBlock({ from: 'Sam', to: 'Dev', amount: 10 });

console.log('\nIs chain valid?', myChain.validateChain()); // true

// ---- Tampering test ----
console.log('\nTampering with block 1 data...');
myChain.chain[1].data = { from: 'Dev', to: 'Alex', amount: 9999 };

console.log('Is chain valid after tampering?', myChain.validateChain()); // false