# Process Fundamentals Notes

## Table of Contents
1. Process vs Program
2. Process States
3. Process Control Block (PCB)
4. Process ID (PID)
5. Parent/Child Processes

## 1. Process vs Program

### Basic Concept
- **Program**
  - Static entity stored on disk
  - Just a file containing instructions
  - Examples: app.js, node.exe
  - Like a recipe in a cookbook

- **Process**
  - Active/Dynamic entity (program in execution)
  - Contains program code + current activity
  - Has its own memory space and resources
  - Like actually cooking the recipe
  - Each process has unique Process ID (PID)

### Node.js Perspective
javascript
// Example: Basic process information
console.log(Process ID: ${process.pid});
console.log(Platform: ${process.platform});
console.log(Memory: ${JSON.stringify(process.memoryUsage())});


### Best Practices
- Clean up resources when process ends
- Handle process signals properly
- Monitor memory usage
- Use process managers (PM2) in production

### Debugging Tips
- Use `ps aux | grep node` to list Node processes
- `top -p <pid>` for real-time monitoring
- Check for memory leaks using Chrome DevTools
- Monitor CPU usage with built-in tools

### Common Issues
1. Memory leaks
2. Zombie processes
3. High CPU usage
4. Unhandled process termination

## 2. Process States

### Basic Concept
- Every process goes through different states during its lifecycle
- OS manages these state transitions
- Only one state possible at a time per process

### Five Main States
1. **New (Created)**
   - Process is just created/born
   - OS is allocating resources
   - PCB (Process Control Block) is being created
   - Like a chef getting ready to cook

2. **Ready**
   - Process is loaded into main memory
   - Waiting for CPU time
   - Like a chef waiting for a free kitchen station

3. **Running**
   - Currently executing on CPU
   - Only one process can be running per CPU core
   - Like a chef actively cooking

4. **Waiting (Blocked)**
   - Process is waiting for some event
   - Example: waiting for file I/O, database response
   - Like a chef waiting for ingredients

5. **Terminated**
   - Process has finished execution
   - Resources are being released
   - Like a chef finishing the dish

   ### State Transitions
- New → Ready: After process creation
- Ready → Running: Scheduler selects process
- Running → Ready: Time quantum expires
- Running → Waiting: Process needs to wait for operation
- Waiting → Ready: Wait event completes
- Running → Terminated: Process completes

### Node.js Perspective
javascript
// Example showing different process states
const { fork } = require('child_process');
// NEW state
const child = fork('worker.js');
// RUNNING state
child.on('message', (msg) => {
console.log('Child is running, received:', msg);
});
// WAITING state
fs.readFile('large-file.txt', (err, data) => {
// Process waits during file read
console.log('File read complete');
});
// TERMINATED state
process.on('SIGTERM', () => {
console.log('Process is terminating...');
process.exit(0);
});


## 3. Process Control Block (PCB)
### Basic Concept
- **PCB (Process Control Block)**
  - Data structure maintained by OS for each process
  - Like an ID card containing process information
  - Created when process starts, destroyed when it ends
  - Essential for process management and multitasking

### Key Components
1. **Process Identification**
   - Process ID (PID)
   - Parent Process ID (PPID)
   - User ID, Group ID

2. **Process State Information**
   - Current state (New, Ready, Running, etc.)
   - Program counter
   - CPU registers
   - Scheduling information

3. **Process Control Information**
   - Memory management info
   - I/O status information
   - CPU usage statistics
   - Priority level

### Node.js Perspective
javascript
// Example: Accessing PCB information in Node.js
console.log(Process ID: ${process.pid});
console.log(Parent PID: ${process.ppid});
console.log(Platform: ${process.platform});
// Memory information
const memoryInfo = process.memoryUsage();
console.log('Memory Usage:', {
heapTotal: ${Math.round(memoryInfo.heapTotal / 1024 / 1024)} MB,
heapUsed: ${Math.round(memoryInfo.heapUsed / 1024 / 1024)} MB,
external: ${Math.round(memoryInfo.external / 1024 / 1024)} MB
});


### Best Practices
- Monitor process resources regularly
- Set appropriate resource limits
- Implement proper error handling
- Use process managers in production

### Debugging Tips
- Use `ps aux` to view process information
- Monitor with `top` or `htop`
- Use Node.js process manager (PM2)
- Check process state with system tools

### Common Issues
1. Resource leaks
2. Process state inconsistencies
3. Orphaned processes
4. Priority inversion


## 4. Process ID (PID)
### Basic Concept
- **Process ID (PID)**
  - Unique numerical identifier for active processes
  - Assigned by OS when process starts
  - Essential for process tracking and management
  - Like a social security number for processes
  - Typically stored as positive integers

### Key Characteristics
1. **PID Assignment**
   - Sequential numbering system
   - Starts from 1 (usually init/system process)
   - Recycled after process termination
   - Unique within running system

2. **PID Hierarchy**
   - Parent Process ID (PPID)
   - Child processes inherit from parent
   - Forms process tree structure
   - Init process (PID 1) is the root

### Node.js Perspective
javascript
// Basic PID information
console.log(Process ID: ${process.pid});
console.log(Parent Process ID: ${process.ppid});
// Creating child processes
const { spawn } = require('child_process');
const child = spawn('node', ['worker.js']);
console.log(Child Process ID: ${child.pid});



### Best Practices
- Track PIDs for running processes
- Clean up child processes properly
- Implement proper error handling
- Use process managers for production

### Debugging Tools
- `ps aux | grep node` - List Node.js processes
- `top -p <pid>` - Monitor specific process
- `kill <pid>` - Terminate process
- `pgrep node` - Find Node.js PIDs

### Common Issues
1. Zombie processes (defunct)
2. Orphaned processes
3. PID conflicts
4. Process isolation problems


## 5. Parent/Child Processes

### Basic Concept
- **Parent/Child Process Relationship**
  - Every process (except init) has a parent process
  - Parent process creates child processes
  - Forms hierarchical process tree structure
  - Like a family tree for processes
  - Example: Terminal (parent) → Node.js process (child)

### Key Characteristics
1. **Process Creation Methods**
   - Fork: Creates exact copy of parent
   - Spawn: Starts new program as child
   - Exec: Replaces current process with new program
   - Each method has specific use cases

2. **Resource Handling**
   - Child can share parent's resources
   - Independent memory spaces
   - Shared file descriptors possible
   - Parent can monitor child's resources

### Node.js Perspective
javascript
// Three main ways to create child processes
const { fork, spawn, exec } = require('child_process');
// 1. Fork Method (for Node.js scripts)
const forkedChild = fork('worker.js');
forkedChild.send({ task: 'process data' });
forkedChild.on('message', (msg) => {
console.log('Child response:', msg);
});
// 2. Spawn Method (for long-running processes)
const spawnedChild = spawn('ls', ['-l']);
spawnedChild.stdout.on('data', (data) => {
console.log('Output:', data.toString());
});
// 3. Exec Method (for command-line operations)
exec('pwd', (error, stdout, stderr) => {
if (error) return console.error('Error:', error);
console.log('Current directory:', stdout);
});


### Process Pool Example
javascript
// Create and manage multiple workers
const workers = new Set();
const MAX_WORKERS = 4;
function createWorker() {
if (workers.size >= MAX_WORKERS) return;
const worker = fork('worker.js');
workers.add(worker);
worker.on('exit', () => {
workers.delete(worker);
});
}



### Best Practices
- Always handle child process termination
- Implement proper error handling for IPC
- Clean up resources when processes end
- Monitor memory usage of child processes
- Use process pools for better resource management
- Implement proper logging for debugging

### Debugging Tips
- Use `pstree` to view process hierarchy
- Monitor parent-child communication
- Check for orphaned processes
- Verify proper process termination
- Use PM2 for process management
- Monitor system resources

### Common Issues
1. **Zombie Processes**
   - Child terminates but entry remains in process table
   - Parent hasn't read exit status
   - Consumes system resources

2. **Orphan Processes**
   - Parent terminates before child
   - Child gets adopted by init process
   - Can cause resource leaks

3. **Communication Issues**
   - IPC failures
   - Message queue overflow
   - Deadlocks in communication

4. **Resource Management**
   - Memory leaks
   - File descriptor leaks
   - CPU overutilization


   ## 6. Process Creation

### Basic Concept
- **Process Creation**
  - System operation to start new processes
  - Allocates necessary resources
  - Initializes process state
  - Assigns unique PID
  - Sets up memory space

### Key Components
1. **Resource Allocation**
   - Memory allocation
   - CPU time allocation
   - File descriptors
   - Security context
   - Environment variables

2. **Initialization Steps**
   - Load program into memory
   - Set up stack and heap
   - Create PCB
   - Initialize registers
   - Set process state to 'new'

### Node.js Perspective
javascript
// Different methods of process creation
const { fork, spawn, exec } = require('child_process');
// 1. Fork Method - For Node.js processes
const nodeProcess = fork('worker.js', {
env: { NODE_ENV: 'production' },
cwd: process.cwd(),
execArgv: ['--max-old-space-size=512']
});
// 2. Spawn Method - For long-running processes
const longRunningProcess = spawn('python', ['script.py'], {
stdio: ['pipe', 'pipe', 'pipe'],
detached: true
});
// 3. Exec Method - For quick commands
exec('ls -la', (error, stdout, stderr) => {
if (error) console.error(Error: ${error});
console.log(Output: ${stdout});
});

### Process Management Example
javascript
// Process Pool Implementation
class ProcessPool {
constructor(maxSize = 4) {
this.pool = new Set();
this.maxSize = maxSize;
}
createWorker() {
if (this.pool.size >= this.maxSize) {
console.log('Pool at maximum capacity');
return;
}
const worker = fork('worker.js');
this.pool.add(worker);
// Handle worker lifecycle
worker.on('exit', () => {
this.pool.delete(worker);
console.log('Worker terminated');
});
return worker;
}
cleanup() {
for (const worker of this.pool) {
worker.kill('SIGTERM');
}
}
}


### Best Practices
- Initialize resources properly
- Implement proper error handling
- Clean up resources on termination
- Monitor process health
- Use process pools for scaling
- Set appropriate resource limits

### Debugging Tips
- Monitor resource allocation
- Check process creation logs
- Use system monitoring tools
- Track parent-child relationships
- Monitor memory usage
- Verify process cleanup

### Common Issues
1. **Resource Allocation Failures**
   - Out of memory
   - Too many open files
   - Insufficient permissions
   - System resource limits

2. **Initialization Problems**
   - Environment setup failures
   - Configuration errors
   - Permission issues
   - Path resolution problems

3. **Scaling Issues**
   - Too many processes
   - Resource contention
   - Memory fragmentation
   - CPU overutilization

4. **Cleanup Problems**
   - Resource leaks
   - Zombie processes
   - Orphaned processes
   - Unclosed file handles

### Process Creation Methods Comparison

#### 1. Fork Method
- **Purpose**: Specifically for Node.js scripts
- **Use Cases**:
  - CPU-intensive tasks
  - Need for two-way communication
  - Running Node.js modules
  - Separate V8 instance needed

javascript
const { fork } = require('child_process');
// Example: Fork for CPU-intensive task
const calculator = fork('worker.js');
// Built-in communication channel
calculator.send({ task: 'calculate', data: [1,2,3,4,5] });
calculator.on('message', result => {
console.log('Calculation result:', result);
});


#### 2. Spawn Method
- **Purpose**: Any command with streaming output
- **Use Cases**:
  - Long-running processes
  - Need streaming data
  - Large data output
  - Non-Node.js commands

  javascript
const { spawn } = require('child_process');
// Example: Spawn for streaming data
const process = spawn('python', ['script.py']);
// Stream-based communication
process.stdout.on('data', data => {
console.log('Output:', data.toString());
});
process.stderr.on('data', data => {
console.error('Error:', data.toString());
});


#### 3. Exec Method
- **Purpose**: Simple shell commands
- **Use Cases**:
  - Quick shell operations
  - Small output expected
  - One-time operations
  - Shell features needed

  javascript
const { exec } = require('child_process');
// Example: Exec for shell command
exec('ls -la', (error, stdout, stderr) => {
if (error) {
console.error(Error: ${error});
return;
}
console.log(Command output: ${stdout});
});

## 7. Process Scheduling
### Basic Concept
- **Process Scheduling**
  - OS mechanism to decide which process runs when
  - Manages CPU time allocation between processes
  - Ensures fair resource distribution
  - Maintains system responsiveness
  - Optimizes CPU utilization

### Key Components
1. **Scheduling Queues**
   - Job Queue: All processes in system
   - Ready Queue: Processes ready to execute
   - Device Queues: Processes waiting for I/O
   - Priority Queues: Based on process priority

2. **Scheduling Algorithms**
   - First Come First Served (FCFS)
   - Round Robin (RR)
   - Priority Scheduling
   - Shortest Job First (SJF)
   - Multilevel Queue

### Node.js Perspective
javascript
// Event Loop Scheduling Example
const eventLoop = {
timers: [], // setTimeout, setInterval
callbacks: [], // I/O callbacks
immediate: [], // setImmediate
processNextTick() {
while(process.nextTick.length > 0) {
let callback = process.nextTick.shift();
callback();
}
},
processTimers() {
const now = Date.now();
while(this.timers.length > 0 && this.timers[0].time <= now) {
let timer = this.timers.shift();
timer.callback();
}
}
};

### Priority-based Process Example
javascript
class PriorityProcess {
constructor(priority) {
this.priority = priority;
this.pid = process.pid;
this.startTime = Date.now();
}
static createWithPriority(scriptPath, priority) {
const child = fork(scriptPath);
try {
// Set process priority (nice value)
process.setpriority(priority);
} catch (error) {
console.error(Priority setting failed: ${error});
}
return child;
}
}
// Usage
const highPriority = PriorityProcess.createWithPriority('critical.js', -10);
const lowPriority = PriorityProcess.createWithPriority('background.js', 10);

### Scheduling Metrics
javascript
class ProcessMetrics {
constructor() {
this.startTime = Date.now();
this.waitTime = 0;
this.turnaroundTime = 0;
this.responseTime = 0;
}
calculateMetrics() {
const endTime = Date.now();
this.turnaroundTime = endTime - this.startTime;
return {
waitTime: this.waitTime,
turnaroundTime: this.turnaroundTime,
responseTime: this.responseTime,
throughput: 1000 / this.turnaroundTime // processes per second
};
}
}



### Best Practices
- Implement appropriate priority levels
- Balance CPU-bound and I/O-bound tasks
- Use worker pools for CPU-intensive tasks
- Monitor scheduling metrics
- Implement proper load balancing
- Handle process starvation

### Debugging Tips
- Monitor CPU usage patterns
- Track process wait times
- Use process monitoring tools
- Check for scheduling bottlenecks
- Analyze process priorities
- Monitor system load

### Common Issues
1. **Process Starvation**
   - Low-priority processes never run
   - Resource hogging by high-priority processes
   - Improper priority assignment

2. **Scheduling Overhead**
   - Too frequent context switching
   - High scheduling algorithm complexity
   - Poor queue management

3. **Performance Issues**
   - CPU bound processes blocking I/O
   - Inefficient process distribution
   - Priority inversion problems

4. **Resource Contention**
   - Multiple processes competing for CPU
   - Deadlocks in resource allocation
   - Priority queue bottlenecks

### AWS Considerations
1. **Container Scheduling**
   - ECS/EKS task scheduling
   - Container resource allocation
   - Service priority levels

2. **Auto-scaling Impact**
   - Process scheduling affects scaling decisions
   - Resource utilization monitoring
   - Performance metrics collection

3. **Lambda Execution**
   - Cold start scheduling
   - Concurrent execution management
   - Resource allocation strategies

## 8. Context Switching

### Basic Concept - Restaurant Kitchen Analogy
- **Context Switching** is like a chef (CPU) managing multiple dishes (processes)
- When switching between dishes, the chef must:
  1. Remember where they left off with current dish
  2. Save all information about current dish
  3. Pick up different dish
  4. Recall/load information about new dish
  5. Start working on new dish

### Real-world Example
javascript
// Like a chef's current task
const chefContext = {
currentDish: "pasta",
step: "making sauce",
timer: "5 minutes",
ingredients: ["tomatoes", "garlic", "herbs"],
temperature: "medium heat"
};
// Switching to urgent salad order
const switchContext = {
saveCurrentTask() {
// Save pasta state
return {
dish: "pasta",
lastStep: "sauce simmering",
timeLeft: "3 minutes"
};
},
loadNewTask() {
// Start salad
return {
dish: "salad",
steps: ["chop vegetables", "mix dressing"],
priority: "urgent"
};
}
};



### Computer Context Switch Components

1. **Save Current State**
javascript
// What CPU needs to save
const processState = {
// Program location
programCounter: 1234,
// Current calculations
registers: {
data: 42,
calculation: 156
},
// Resources in use
openFiles: ['data.txt'],
memory: {
heap: 0x1234,
stack: 0x5678
}
};


2. **Load New State**
javascript
// Loading different process
const newProcess = {
// Different program location
programCounter: 5678,
// Different calculations
registers: {
data: 99,
calculation: 234
},
// Different resources
openFiles: ['config.json'],
memory: {
heap: 0x9ABC,
stack: 0xDEF0
}
};



### Context Switch Costs

1. **Direct Costs** (Like chef cleaning utensils)
   - Save current process state
   - Load new process state
   - Update memory management
   - Switch CPU registers

2. **Indirect Costs** (Like reorganizing kitchen)
   - Cold cache (finding ingredients again)
   - Pipeline stalls (reheating equipment)
   - Memory delays (getting new recipes)
   - TLB flushes (reorganizing workspace)

### Best Practices
- Minimize unnecessary switches
- Group related tasks together
- Use efficient scheduling
- Maintain proper priorities
- Monitor switching overhead
- Optimize resource usage

### Common Issues
1. **Performance Impact**
   - Too many switches slow system
   - Resource overhead
   - Cache efficiency loss
   - Memory access delays

2. **Resource Management**
   - Memory fragmentation
   - Cache pollution
   - TLB misses
   - Pipeline stalls

3. **Scheduling Problems**
   - Priority inversion
   - Starvation
   - Deadlocks
   - Livelocks

### AWS Considerations
1. **Container Impact**
   - Container startup/shutdown
   - Resource allocation
   - Service scheduling
   - Performance optimization

2. **Lambda Functions**
   - Cold starts
   - Function initialization
   - Resource provisioning
   - Execution context


   ### Basic Concept - Restaurant Closing Analogy
- **Process Termination** is like closing a restaurant for the day:
  1. Save important data (storing ingredients)
  2. Clean up resources (cleaning kitchen)
  3. Close connections (turning off equipment)
  4. Release memory (locking up)
  5. Exit gracefully (final checks)

### Types of Termination
1. **Normal Termination (Voluntary)**
   - Process completes its task
   - Resources cleaned up properly
   - Proper exit status returned
   - Like normal restaurant closing

2. **Forced Termination (Involuntary)**
   - External signal/interrupt
   - System shutdown
   - Parent process termination
   - Like emergency evacuation

### Comprehensive Example
javascript
class GracefulShutdown {
constructor() {
this.resources = new Set();
this.isShuttingDown = false;
// Register termination handlers
process.on('SIGTERM', () => this.terminate('SIGTERM'));
process.on('SIGINT', () => this.terminate('SIGINT'));
process.on('uncaughtException', (error) => {
console.error('Uncaught Exception:', error);
this.terminate('uncaughtException');
});
}
// Add resource for cleanup
addResource(resource) {
this.resources.add(resource);
}
// Clean up single resource
async cleanupResource(resource) {
try {
if (resource.disconnect) await resource.disconnect();
if (resource.close) await resource.close();
if (resource.end) await resource.end();
this.resources.delete(resource);
} catch (error) {
console.error(Cleanup failed for resource:, error);
}
}
// Main termination method
async terminate(signal) {
if (this.isShuttingDown) return;
this.isShuttingDown = true;
console.log(\nReceived ${signal}. Starting graceful shutdown...);
try {
// 1. Save critical data
await this.saveData();
// 2. Clean up resources
for (const resource of this.resources) {
await this.cleanupResource(resource);
}
// 3. Final cleanup
console.log('Cleanup completed successfully');
process.exit(0);
} catch (error) {
console.error('Error during shutdown:', error);
process.exit(1);
}
}
async saveData() {
// Save important application state
console.log('Saving application state...');
}
}
// Usage
const shutdown = new GracefulShutdown();
// Add database connection
shutdown.addResource(dbConnection);
// Add file handles
shutdown.addResource(fileHandle);
// Add network connections
shutdown.addResource(serverConnection);


### Best Practices
- Implement proper cleanup handlers
- Handle different termination signals
- Save critical data before exit
- Release resources in correct order
- Log termination reasons
- Set appropriate timeouts

### Common Issues
1. **Resource Leaks**
   - Unclosed file handles
   - Active network connections
   - Unreleased memory
   - Zombie processes

2. **Data Loss**
   - Unsaved changes
   - Corrupted files
   - Incomplete transactions
   - Buffer flush failures

### AWS Considerations
1. **Container Termination**
   - Grace period handling
   - Resource cleanup
   - State persistence
   - Health check failures

2. **Lambda Cleanup**
   - Connection pooling
   - Temporary files
   - Memory cleanup
   - Context reuse

## 10. Zombie Processes

### Basic Concept - Restaurant Analogy
- **Zombie Process** is like a completed food order ticket that hasn't been removed from the kitchen board
  - Order is done (process finished)
  - Ticket still hanging (process table entry remains)
  - Taking up board space (consuming system resources)
  - Chef needs to clear ticket (parent must read exit status)

### Technical Definition
- Process that has completed execution
- Still has entry in process table
- Waiting for parent to read its exit status
- Shows as 'Z' or 'defunct' in process status

### Example Implementation
javascript
// Example showing zombie process creation and prevention
class ProcessManager {
constructor() {
this.children = new Map();
}
// BAD: Creates zombie process
startProcessBadly() {
const child = fork('worker.js');
this.children.set(child.pid, child);
// No exit handler -> becomes zombie when terminates
}
// GOOD: Prevents zombie process
startProcessProperly() {
const child = fork('worker.js');
this.children.set(child.pid, child);
// Proper exit handler prevents zombie
child.on('exit', (code, signal) => {
this.children.delete(child.pid);
console.log(Child ${child.pid} exited with code ${code});
});
}
}


### Prevention Mechanisms
1. **Proper Exit Handling**

javascript
// Parent process handling child exit
process.on('SIGCHLD', () => {
// Clean up any terminated children
let child;
while ((child = waitpid(-1, 0)) > 0) {
console.log(Cleaned up child process ${child});
}
});


2. **Resource Monitoring**

javascript
class ZombieDetector {
static async findZombies() {
return new Promise((resolve, reject) => {
exec('ps aux | grep -w Z', (error, stdout) => {
const zombies = stdout
.split('\n')
.filter(line => line.includes(' Z '));
resolve(zombies);
});
});
}
}



### Common Issues
1. **Creation Causes**
   - Parent doesn't implement exit handlers
   - Parent process crashes
   - Improper process management
   - Missing SIGCHLD handlers

2. **System Impact**
   - Process table pollution
   - Resource waste
   - System performance degradation
   - Maximum process limits

### Best Practices
1. **Prevention**
   - Always implement exit handlers
   - Use process managers (PM2)
   - Monitor child processes
   - Implement proper error handling

2. **Detection**
   - Regular system monitoring
   - Process status checks
   - Resource usage tracking
   - Logging and alerts

### AWS Considerations
1. **Container Environment**
   - Proper process cleanup in containers
   - Container lifecycle management
   - Health check implementation
   - Resource limit monitoring

2. **Lambda Functions**
   - Child process management
   - Timeout handling
   - Resource cleanup
   - Error handling

### Debugging Commands
bash
Find zombie processes
ps aux | grep 'Z'
Check process tree
pstree -p
Detailed process info
ps -el | grep 'Z'
Kill parent of zombie
kill -9 <parent_pid>


## 11. Daemon Processes

### Basic Concept
- **Daemon Process** is like a restaurant's maintenance staff
  - Runs in background without user interaction
  - Provides ongoing services
  - No controlling terminal
  - Long-running processes
  - Usually started at boot time

### Characteristics
1. **Key Features**
   - Runs in background
   - No controlling terminal
   - Parent process is usually init (PID 1)
   - Often runs with root/system privileges
   - Responds to signals or events

2. **Common Uses**
   - System services
   - Scheduled tasks
   - Monitoring services
   - Network services
   - Log management

### Example Implementation
javascript
// Basic Node.js daemon implementation
class SimpleDaemon {
constructor() {
this.isRunning = false;
this.logFile = '/var/log/daemon.log';
// Handle signals
process.on('SIGTERM', () => this.shutdown());
process.on('SIGHUP', () => this.reload());
}
async start() {
try {
// 1. Close standard file descriptors
process.stdin.destroy();
// 2. Redirect output to log file
const logStream = fs.createWriteStream(this.logFile, { flags: 'a' });
process.stdout.write = logStream.write.bind(logStream);
process.stderr.write = logStream.write.bind(logStream);
// 3. Change working directory
process.chdir('/');
// 4. Start main service loop
this.isRunning = true;
this.run();
console.log('Daemon started successfully');
} catch (error) {
console.error('Failed to start daemon:', error);
process.exit(1);
}
}
async run() {
while (this.isRunning) {
// Daemon's main work here
await this.performWork();
await this.sleep(5000); // Wait 5 seconds
}
}
}


### Windows Services Examples
1. **Common Windows Daemons**
   - Windows Update (wuauserv)
   - Print Spooler (spooler)
   - Task Scheduler (Schedule)
   - Windows Defender (WinDefend)
   - IIS Web Server (W3SVC)

