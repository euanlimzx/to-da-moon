import { useRef, useState } from 'react'
import RocketObject from '@/components/rotation-visualizer/object'
import DarkCard from '@/components/dashboard/darkCard'

/**
 * @name LineBreakTransformer
 * TransformStream to parse the stream into lines.
 */
class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.container = ''
    }

    transform(chunk, controller) {
        this.container += chunk
        const lines = this.container.split('\n')
        this.container = lines.pop()
        lines.forEach((line) => {
            controller.enqueue(line)
        })
    }

    flush(controller) {
        controller.enqueue(this.container)
    }
}

const RotationVisualizer = () => {
    const [orientation, setOrientation] = useState([0, 0, 0])

    const port = useRef<SerialPort>(null)
    const decoder = useRef<TextDecoderStream>(null)
    const inputDone = useRef(null)
    const inputStream = useRef<ReadableStream>(null)
    const reader = useRef<ReadableStreamDefaultReader>(null)
    const outputStream = useRef(null)
    const outputDone = useRef(null)

    /**
     * @name connect
     * Opens a Web Serial connection to a micro:bit and sets up the input and
     * output stream.
     */
    async function connect() {
        // - Request a port and open a connection.
        port.current = await navigator.serial.requestPort()

        if (!port.current) {
            return
        }
        // - Wait for the port to open
        await port.current.open({ baudRate: 115200 })

        decoder.current = new TextDecoderStream()

        if (!decoder.current) {
            return
        }

        // Only pipe once
        inputDone.current = port.current.readable.pipeTo(
            decoder.current.writable
        )
        inputStream.current = decoder.current.readable.pipeThrough(
            new TransformStream(new LineBreakTransformer())
        )

        if (!inputStream.current) {
            return
        }

        reader.current = inputStream.current.getReader()

        readLoop().catch(async function (error) {
            await disconnect()
        })
    }

    /**
     * @name disconnect
     * Closes the Web Serial connection.
     */
    async function disconnect() {
        if (reader.current) {
            await reader.current.cancel()
            await inputDone.current.catch(() => {})
            reader.current = null
            inputDone.current = true
        }

        if (outputStream.current) {
            await outputStream.current.getWriter().close()
            await outputDone.current
            outputStream.current = null
            outputDone.current = null
        }

        if (port.current) {
            await port.current.close()
            port.current = null
            // showCalibration = false;
        }
    }

    /**
     * @name readLoop
     * Reads data from the input stream and displays it on screen.
     */
    async function readLoop() {
        while (true && reader.current) {
            const { value, done } = await reader.current.read()
            if (value) {
                if (value.substr(0, 12) == 'Orientation:') {
                    setOrientation(
                        value
                            .substr(12)
                            .trim()
                            .split(',')
                            .map((x) => +x)
                    )
                }
            }
            if (done) {
                console.log('[readLoop] DONE', done)
                reader.current.releaseLock()
                break
            }
        }
    }

    console.log(orientation)

    return (
        <DarkCard>
            <div>
                <button onClick={async () => await connect()}>Connect</button>
                <button onClick={async () => await disconnect()}>
                    Disconnect
                </button>
            </div>
            <RocketObject orientation={orientation} />
        </DarkCard>
    )
}

export default RotationVisualizer
