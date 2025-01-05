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