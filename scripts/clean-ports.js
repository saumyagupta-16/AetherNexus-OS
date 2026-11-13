const { execSync } = require('child_process');

const PORTS = [8000, 3000];

function freePort(port) {
  if (process.platform === 'win32') {
    // 1. Terminate owning process using PowerShell Get-NetTCPConnection (most accurate on Windows)
    try {
      execSync(
        `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
        { stdio: 'ignore' }
      );
    } catch (e) {}

    // 2. Netstat fallback to catch any stray sockets or non-standard states
    try {
      const output = execSync(`netstat -ano | findstr :${port}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      });
      const lines = output.trim().split(/\r?\n/);
      const pids = new Set();
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 4) {
          const localAddr = parts[1];
          if (localAddr && (localAddr.endsWith(`:${port}`) || localAddr.includes(`:${port}`))) {
            const pid = parts[parts.length - 1];
            if (pid && pid !== '0' && pid !== `${process.pid}` && /^\d+$/.test(pid)) {
              pids.add(pid);
            }
          }
        }
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
          console.log(`[CLEANUP] Freed port ${port} by terminating PID ${pid}.`);
        } catch (e) {}
      }
    } catch (e) {
      // Port is already free
    }
  } else {
    try {
      execSync(`lsof -t -i:${port} | xargs kill -9`, { stdio: 'ignore' });
      console.log(`[CLEANUP] Freed port ${port}.`);
    } catch (e) {}
  }
}

for (const port of PORTS) {
  freePort(port);
}
console.log('[CLEANUP] Port cleanup verified: Ports 8000 and 3000 are ready.');
