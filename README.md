# Vivid Sound Generator

A browser-based sound generator for the Vivid project. 

Uses the WebAudio API to generate ambient sound and chord pulses. Pulses triggered with 
[OSC](https://en.wikipedia.org/wiki/Open_Sound_Control). Pulse data passed to the client using 
[WebSockets](https://en.wikipedia.org/wiki/WebSocket).

# Overview

```
+-----------+                      +--------------+                         +--------------+
|           |    /~~~~~~~~~~~~\    |              |                         |              |
|           |    |            | => | OSC Receiver |    /~~~~~~~~~~~~~~~\    | Web Browser  |
|   Pulse   | => | OSC Packet |    |       -      |    |               |    |      -       |
| generator |    |   (UDP)    |    |   WebSocket  |    | WebSocket Msg |    | WebAudio API |
|           |    |            |    |    Server    | => |    (HTTP)     | => |     _   _    |
|           |    \~~~~~~~~~~~~/    |              |    |               |    |  \_/ \_/ \_  |
+-----------+                      +--------------+    \~~~~~~~~~~~~~~~/    +--------------+
```

* **Pulse generator** - a device on the network which sends one OSC packet over UDP for each 
recorded heart beat.
* **OSC packet** - a UDP message which contains contains information about a heart beat. Each 
message contains 2 pieces of information: heart rate and stroke volume.
* **OSC Receiver** - a node.js process which listens for OSC packets.
* **WebSocket Server** - a node.js process which handles WebSocket connections and sends OSC packet
information to connected clients.
* **WebSocket msg** - a WebSocket message which contains the information about the received OSC 
packet.
* **Web Broser** - the user's web browser (e.g. Google Chrome).
* **WebAudio API** - generates ambient sound and plays a special sound whenever pulse data is
received over WebSocket

# Development

## 1. Clone the repo

```
git clone git@github.com:DiUS/vivid-sound-generator.git
```

## 2. Install the dependencies 

```
npm i
```

## 3. Run the mock server

```
# Start the mock OSC Pulse generator
npm run start.oscpulse

# Start the WebSocket server
npm run start.server

# Start the UI Dev Server
npm run dev
```
