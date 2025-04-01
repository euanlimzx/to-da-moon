import {
    LineChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from 'recharts'

function Chart({ data }: { data: { [key: string]: number }[] }) {
    return (
        <div>
            <LineChart
                width={400}
                height={200}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <defs>
                    <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#507CFF" stopOpacity={1} />
                        <stop
                            offset="100%"
                            stopColor="#C0D7FA"
                            stopOpacity={1}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid />
                <YAxis />
                <Tooltip active={false} />
                <Legend />
                <Line
                    dot={false}
                    type="monotone"
                    dataKey="Fuel-Tank"
                    stroke="url(#gradient)" // Reference the gradient
                    strokeWidth={3}
                />
            </LineChart>
        </div>
    )
}

export default Chart
