# Memory Management in Node.js 🧠

## 1. Stack vs Heap Memory

### Stack Memory 📚
bash
Stack (LIFO - Last In, First Out)
│
├── Characteristics
│ ├── Fixed size
│ ├── Fast access
│ └── Automatic memory management
│
└── Stores
├── Primitive values (numbers, strings)
├── Function call frames
└── References to heap objects


### Example: Stack Operations
javascript
function calculateTotal(a, b) { // New stack frame
const tax = 0.2; // Stored in stack
const total = (a + b) tax; // Calculation in stack
return total; // Returns and frame is removed
} // Stack frame cleared


### Heap Memory 🎒
bash
Heap (Dynamic Memory)
│
├── Characteristics
│ ├── Dynamic size
│ ├── Slower access
│ └── Garbage collected
│
└── Stores
├── Objects
├── Arrays
└── Complex data structures

### Example: Heap Operations
vascript
// Objects stored in heap
const user = {
name: 'John',
age: 30,
hobbies: ['reading', 'coding']
};
// Arrays in heap
const bigArray = new Array(1000);


## 2. Visual Memory Model
bash
Memory Layout
┌──────────────────┐
│ Stack │
├──────────────────┤
│ Function frames │
│ Primitive values │
│ Heap references │──┐
└──────────────────┘ │
│
┌──────────────────┐ │
│ Heap │ │
├──────────────────┤ │
│ Objects │◄─┘
│ Arrays │
│ Large datasets │
└──────────────────┘

 
Remember:
- Stack is for simple, temporary data
- Heap is for complex, persistent data
- Always clean up resources
- Be mindful of memory leaks
- Use appropriate data structures

 ## 3. Memory Allocation 🎯

### Types of Allocation
bash
Memory Allocation
│
├── Stack Allocation
│ ├── Automatic (Fixed size)
│ ├── Function frames
│ └── Primitive values
│
└── Heap Allocation
├── Dynamic (Flexible size)
├── Objects & Arrays
└── Managed by Garbage Collector

## 4. Garbage Collection 🗑️

### Overview
bash
Garbage Collection Process
│
├── Young Generation (New Space)
│ ├── Minor GC (Scavenger)
│ └── Fast & Frequent
│
└── Old Generation (Old Space)
├── Major GC (Mark-Sweep-Compact)
└── Slower & Less Frequent

### Young Generation (Scavenger)
javascript
// Objects start in Young Generation
const newObject = { name: 'John' }; // Goes to new space
// Scavenger Process:
Allocation in 'To' space
Live objects copied to 'From' space
Dead objects removed
Survivors promoted to Old Generation


### Old Generation (Mark-Sweep-Compact)
javascript
// Long-lived objects move to Old Generation
class Cache {
constructor() {
this.data = new Map(); // Will likely move to old space
}
}
// Process:
Marking: Identify live objects
Sweeping: Remove dead objects
Compacting: Defragment memory


Remember:
- Young objects die young (Generational Hypothesis)
- Major GC can impact performance
- Monitor memory usage
- Clear references when done
- Use appropriate data structures
- Consider WeakMap/WeakSet for caches



## 5. Virtual Memory 💾

### Overview
bash
Virtual Memory System
│
├── Physical Memory (RAM)
│ ├── Fast Access (nanoseconds)
│ └── Limited Size (e.g., 8GB)
│
└── Virtual Memory (HDD/SSD)
├── Slower Access (milliseconds)
└── Large Size (part of disk)


### How It Works
javascript
// Memory Pages
const pageSize = 4096; // Usually 4KB
// 1. Active Data (Stays in RAM)
const activeUser = {
id: 1,
name: 'John'
};
// 2. Inactive Data (Might move to swap)
const oldLogs = loadHistoricalData(); // Large dataset


Remember:
- Virtual memory combines RAM and disk space
- Active data stays in RAM for fast access
- Inactive data may move to swap space
- Swapping can significantly impact performance
- Monitor memory usage to prevent excessive swapping
- Use streaming and chunking for large data sets
