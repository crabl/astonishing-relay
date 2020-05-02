# AstonishingRelay
geocaching, but make it 2020

### to run
`./server.sh`, make sure you trust the cert (included), it's self-signed. if you don't like it, replace it by generating your own.
then go to `https://locahost:4200/` (https is critical, otherwise location services will refuse to work...)

### to build
`ng build --prod` and then deploy the bundle to netlify or your favorite static host

### screenshot
![app screenshot](https://github.com/crabl/astonishing-relay/blob/master/screenshot.png?raw=true)
