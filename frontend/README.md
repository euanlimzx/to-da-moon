macOS / Linux (ifconfig):

Look for a section like en0 (for Wi-Fi) or eth0 (for Ethernet). You're looking for the inet address, not inet6. It should look like:

en0: flags=8863<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1500
inet 192.168.1.104 netmask 0xffffff00 broadcast 192.168.1.255
inet6 fe80::1cfe:b0ff:fe02:1d26%en0 prefixlen 64 secured scopeid 0x4
ether 1a:cf:b0:02:1d:26

Here, the IPv4 address is 192.168.1.104.
