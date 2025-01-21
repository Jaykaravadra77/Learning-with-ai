
4. CPU & SCHEDULING
- CPU cores
 
// Incoming Request Flow
Request → Node.js Server
│
├── JavaScript (Single Thread)
│   └── Core 1: Event Loop
│       console.log('Request received');
│
└── OS Level (Multiple Cores)
    ├── Core 1: TCP packet handling
    ├── Core 2: Memory allocation
    ├── Core 3: File system ops
    └── Core 4: Network response

// another example
1️⃣ JavaScript Thread (Single Core)
   ├── Receives request
   └── Prepares response

2️⃣ Operating System Level (Multiple Cores)
   ├── Core 1: Handles network packet reception
   ├── Core 2: Manages memory operations
   ├── Core 3: Handles system calls
   └── Core 4: Processes network response


   const restaurant = {
    frontDesk: "Node.js Single Thread", // One person taking orders
    kitchen: "Operating System", // Multiple chefs working
    
    process: {
        1: "Customer orders (Single Thread)",
        2: "Order distributed to kitchen (OS Level)",
        3: "Multiple chefs cook (Multiple Cores)",
        4: "Order delivered (Back to Single Thread)"
    }
};

4. CPU & SCHEDULING

## A. Basic CPU Core Concepts
- CPU cores handle parallel execution
- Node.js runs on single thread but OS utilizes multiple cores

### Request Flow Example
javascript
Request → Node.js Server
│
├── JavaScript (Single Thread)
│ └── Core 1: Event Loop
│ console.log('Request received');
│
└── OS Level (Multiple Cores)
├── Core 1: TCP packet handling
├── Core 2: Memory allocation
├── Core 3: File system ops
└── Core 4: Network response


### Restaurant Analogy
javascript
const restaurant = {
frontDesk: "Node.js Single Thread", // One person taking orders
kitchen: "Operating System", // Multiple chefs working
process: {
1: "Customer orders (Single Thread)",
2: "Order distributed to kitchen (OS Level)",
3: "Multiple chefs cook (Multiple Cores)",
4: "Order delivered (Back to Single Thread)"
}
};

## B. Clustering vs Worker Threads

### Theory
javascript
const theory = {
clustering: {
what: "Multiple processes (separate restaurants)",
purpose: "Scale across CPU cores",
sharing: "No memory sharing",
use: "Web servers, API handling"
},
workerThreads: {
what: "Threads within process (chefs in one kitchen)",
purpose: "CPU intensive tasks",
sharing: "Can share memory",
use: "Heavy computations"
}
};


### Real-World Analogies

#### Clustering: Restaurant Chain
- Master Process = Main Branch Restaurant
- Worker Processes = Franchise Locations
- Each location works independently
- Load balancer distributes customers

#### Worker Threads: Single Restaurant Kitchen  
- Process = Restaurant Kitchen
- Worker Threads = Multiple Chefs
- All chefs share same kitchen/tools
- Head chef coordinates tasks

### When to Use What
javascript
const useCase = {
useClustering: [
"Web servers with many requests",
"API servers needing high availability",
"Load balancing across cores",
"Process isolation needed"
],
useWorkerThreads: [
"Heavy calculations",
"Image/video processing",
"Data processing",
"Shared memory beneficial"
]
};
