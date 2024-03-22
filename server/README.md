## The Server was created with inspiration from this source https://www.youtube.com/watch?v=sBw0O5YTT4Q&t=224s


#STEPS
Download redis for your computer
1. In a new terminal run brew install redis
2. Start the redis server by running redis-server
- It should open up this 

6724:C 14 Mar 2024 17:09:21.512 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
6724:C 14 Mar 2024 17:09:21.512 * Redis version=7.2.4, bits=64, commit=00000000, modified=0, pid=6724, just started
6724:C 14 Mar 2024 17:09:21.512 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
6724:M 14 Mar 2024 17:09:21.513 * Increased maximum number of open files to 10032 (it was originally set to 256).
6724:M 14 Mar 2024 17:09:21.513 * monotonic clock: POSIX clock_gettime
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 7.2.4 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                  
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 6724
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           https://redis.io       
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               

6724:M 14 Mar 2024 17:09:21.514 # WARNING: The TCP backlog setting of 511 cannot be enforced because kern.ipc.somaxconn is set to the lower value of 128.
6724:M 14 Mar 2024 17:09:21.514 * Server initialized
6724:M 14 Mar 2024 17:09:21.514 * Ready to accept connections tcp

3. Test server by running in a the ide terminal (seperate from the terminal above) redis-cli and then typing in Ping. If you get Pong back it works
4. Run flask in the server folder
5. You have the backend up and running

# Changes Made:
- Added .venv
    ```bash
    source server/.venv/bin/activate
    ```