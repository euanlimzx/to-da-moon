Connect all devices to ILAY
start MQTT server
start grafana server (for you, this should be 3000?)
Starting the webapp
cd backend, npm run dev (for you, this should be 3001)
cd frontend, npm run dev -- -H 0.0.0.0 -p 3002 (for you, this should be 3002)
our websites normally run on localhost:3000, but now instead, we want to find our ip by running ifconfig
we will receive a response like
...
en0: flags=8863<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
inet 192.168.1.100 netmask 0xffffff00 broadcast 192.168.1.255
inet6 fe80::1cfe:b0ff:fe02:1d26%en0 prefixlen 64 secured scopeid 0x4
ether 1a:cf:b0:02:1d:26
...
we look for en0, inet. in this example, our ip will be 192.168.1.100
this means that, our backend can be accessed via 192.168.1.100:3001 and our frontend can be accessed via
192.168.1.100:3002 4. In your frontend .env file, add this NEXT_PUBLIC_WEBSOCKET_DOMAIN=http://192.168.0.100:3001/ (use the ip address of your computer) 5. our website can now be accessed via 192.168.1.100:3001
Python
in your python file, change WEBSOCKET_ADDRESS to be 192.168.1.100:3001, the backend
run python
everything should work!
