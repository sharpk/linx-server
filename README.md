# LINX REST Server

This project is a Node.js based HTTP server which wraps the functionality of the [LINX I/O library](https://github.com/MakerHub/LINX).

It's currently experimental, and probably shouldn't be used by anyone.

## LICENSE

See the [LICENSE file](../master/LICENSE) for details.

## INSTALLATION

1. Install node.js and npm

   ```
   sudo apt-get install nodejs npm  
   npm install express ffi ref --save  
   ```

   In order to get ffi to install I had to apply the workaround from [this link](https://github.com/fivdi/onoff/wiki/Node.js-v0.10.29-and-native-addons-on-the-Raspberry-Pi).

2. Build the LINX library

   ```
   git clone https://github.com/MakerHub/LINX.git  
   cd LINX  
   git checkout 2.1  
   cd LabVIEW/vi.lib/MakerHub/LINX/Firmware/Source/make/  
   make raspberryPi2BLib  
   ```

   The .so file will now be at `LINX/LabVIEW/vi.lib/MakerHub/LINX/Firmware/Source/make/core/examples/LinxDeviceLib/bin/liblinxdevice_rpi2.so`

   ```
   sudo cp LINX/LabVIEW/vi.lib/MakerHub/LINX/Firmware/Source/make/core/examples/LinxDeviceLib/bin/liblinxdevice_rpi2.so /usr/lib/.  
   sudo ldconfig  
   ```

3. Run it

   `node linx-server.js`

## USAGE

The URLs to access individual LINX IO functions are currently undocumented and you should probably refer to the source code to see the REST endpoints and what values can be passed to them.

