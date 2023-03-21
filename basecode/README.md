# dw-read
An example of reading data fom the data warehouse though the **API Gateway**.

## Caveats
1. The gateway can only be accessed from the physical network or when connected to the VPN.
2. The native implementation of SSL after Node 17 is too advanced for the gateway server (!), therefore node version 17 should be used.   `fetch` was only added to node in version 18, so the non-native `node-fetch` library is set as a dependency.  Once the gateway server has been updated this should no longer be a problem.
3. The older SSL in the gateway server doesn't (even) work with node 17 without a bit of configuring, so there is an `openssl.cnf` file in the `config` folder that enables `UnsafeLegacyRenegotiation`... this too can be remov ed once the gateway server is updated.

## Install and Run

### To install dependencies...
```shell
npm install
```

### To select node 17...
Ensure you have `nvm` (Node Version Manager) installed and run...
```shell
nvm install 17
nvm use 17
```

### To run ...
```shell
npm start
```
