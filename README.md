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
