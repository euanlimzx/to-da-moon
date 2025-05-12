import socketio
import time
import random

WEBSOCKET_ADDRESS = "http://192.168.0.100:3000"
LIVE_DATA_PUSH_CHANNEL = "live/receive-data-stream-from-mqtt"
TARGET_LAT_LNG = "live/receive-data-stream-from-mqtt-latlng"

def main():
    with socketio.SimpleClient() as sio:
        sio.connect(WEBSOCKET_ADDRESS)
        data_template = [
            {
                "dataName": "Fuck",
                "dataCol": 1,
                "min": 0,
                "max": 600,
                "secondDisplayType": "graph",
                "units": "%"
            },
            {
                "dataName": "Ox Tank",
                "dataCol": 2,
                "min": 0,
                "max": 600,
                "secondDisplayType": "graph",
                "units": "L/min"
            },
            {
                "dataName": "Throttle Cavity",
                "dataCol": 3,
                "min": -20,
                "max": 150,
                "secondDisplayType": "gauge",
                "units": "psi"
            }
        ]

        targetLatLng = {
            "latitude": 34.0671461,
            "longitude":-118.4506155
        }

        while True:
            data = []
            for item in data_template:
                new_item = item.copy()
                new_item["value"] = round(random.uniform(item["min"], item["max"]), 2)
                data.append(new_item)

            sio.emit(LIVE_DATA_PUSH_CHANNEL, data)
            # sio.emit(TARGET_LAT_LNG, targetLatLng)
            print("Data sent:", data)

if __name__ == "__main__":
    main()
