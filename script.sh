#!/bin/bash
echo "Hello World"

gnome-terminal -- /bin/sh -c 'echo Ejecutando Nodo 1; cd IBFT-Network/Node-1; ~/besu-21.1.7/bin/besu --data-path=data --genesis-file=../genesis.json --rpc-http-enabled --rpc-http-host=127.0.0.1 --rpc-http-port=8545 --rpc-http-api=ETH,NET,ADMIN,IBFT,WEB3 --host-allowlist="*" --rpc-http-cors-origins="all" --p2p-enabled=true --p2p-host=127.0.0.1 --p2p-interface=0.0.0.0 --p2p-port=30303;  exec bash'

sleep 20 

gnome-terminal -- /bin/sh -c 'echo Ejecutando Nodo 2; cd IBFT-Network/Node-2; ~/besu-21.1.7/bin/besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://d2158fb701a4759b7d9831484506da3f75130f1ca263ad999a18c2346e7b968205549ea878001030c0445a83f1f61b7902cb215898bb79fc0f9405cec4305d77@127.0.0.1:30303 --p2p-enabled=true --p2p-host=127.0.0.1 --p2p-interface=0.0.0.0 --p2p-port=30304 --rpc-http-enabled --rpc-http-host=127.0.0.1 --rpc-http-api=ETH,NET,IBFT,ADMIN,WEB3 --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546 --miner-enabled --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73;   exec bash '

sleep 5 

gnome-terminal -- /bin/sh -c 'echo Ejecutando Nodo 3; cd IBFT-Network/Node-3; ~/besu-21.1.7/bin/besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://d2158fb701a4759b7d9831484506da3f75130f1ca263ad999a18c2346e7b968205549ea878001030c0445a83f1f61b7902cb215898bb79fc0f9405cec4305d77@127.0.0.1:30303 --p2p-enabled=true --p2p-host=127.0.0.1 --p2p-interface=0.0.0.0 --p2p-port=30305 --rpc-http-enabled --rpc-http-host=127.0.0.1 --rpc-http-api=ETH,NET,IBFT,ADMIN,WEB3 --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547; exec bash'

sleep 5

gnome-terminal -- /bin/sh -c 'echo Ejecutando Nodo 4; cd IBFT-Network/Node-4; ~/besu-21.1.7/bin/besu --data-path=data --genesis-file=../genesis.json --bootnodes=enode://d2158fb701a4759b7d9831484506da3f75130f1ca263ad999a18c2346e7b968205549ea878001030c0445a83f1f61b7902cb215898bb79fc0f9405cec4305d77@127.0.0.1:30303 --p2p-enabled=true --p2p-host=127.0.0.1 --p2p-interface=0.0.0.0 --p2p-port=30306 --rpc-http-enabled --rpc-http-host=127.0.0.1 --rpc-http-api=ETH,NET,IBFT,ADMIN,WEB3 --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8548; exec bash'