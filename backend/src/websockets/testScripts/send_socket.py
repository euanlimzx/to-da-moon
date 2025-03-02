import socketio, time

WEBSOCKET_ADDRESS = "http://localhost:3000"
LIVE_DATA_PUSH_CHANNEL = "live/receive-data-stream-from-mqtt"


def main():
    with socketio.SimpleClient() as sio:
        sio.connect(WEBSOCKET_ADDRESS)

        data = {
            "pt0": 23,
            "pt1": 12,
            "pt2": 34,
            "pt3": 32,
            "lc1": -12,
        }

        while True:
            sio.emit(LIVE_DATA_PUSH_CHANNEL, data)
            print("Data sent")
            time.sleep(2)


if __name__ == "__main__":
    main()
