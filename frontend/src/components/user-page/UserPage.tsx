import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Filler,
    Colors,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import CountUp from "react-countup";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json";

const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
};

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: false,
        },
    },
};

export const barLabels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
];

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
    labels,
    datasets: [
        {
            fill: true,
            data: labels.map(() => Math.floor(Math.random() * 3000)),
            elements: {
                point: {
                    radius: 0,
                },
            },
        },
    ],
};

const barData = {
    labels: barLabels,
    datasets: [
        {
            data: barLabels.map(() => Math.floor(Math.random() * 3000)),
            backgroundColor: "rgba(255, 99, 132, 1)",
        },
    ],
};

const colorScale = scaleQuantile()
    .domain([0, 3000])
    .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618",
    ]);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Filler,
    Colors
);

function UserPage() {
    return (
        <div className="linkit-page">
            <div className="linkit-row">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        flexWrap: "wrap",
                        flexBasis: "500px",
                        flexGrow: 1,
                        height: "fit-content",
                    }}
                >
                    <Card
                        style={{
                            maxWidth: "700px",
                            minWidth: "220px",
                            flexGrow: 1,
                            flexBasis: "220px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
                                style={{ fontSize: "30px" }}
                                end={5231251312}
                                duration={2}
                                // start={100 - 30}
                                useEasing={true}
                            />
                            <h6 className="card-title">No. Links</h6>
                        </Card.Body>
                    </Card>
                    <Card
                        style={{
                            maxWidth: "700px",
                            minWidth: "220px",
                            flexGrow: 1,
                            flexBasis: "220px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
                                style={{ fontSize: "30px" }}
                                end={123123}
                                duration={2}
                                // start={100 - 30}
                                useEasing={true}
                            />
                            <h6 className="card-title">Total Clicks</h6>
                        </Card.Body>
                    </Card>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        width: "100%",
                        flexWrap: "wrap",
                        flexBasis: "500px",
                        flexGrow: 1,
                    }}
                >
                    <Card
                        style={{
                            maxWidth: "700px",
                            minWidth: "220px",
                            flexGrow: 1,
                            flexBasis: "220px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
                                style={{ fontSize: "30px" }}
                                end={5}
                                duration={2}
                                // start={100 - 30}
                                useEasing={true}
                            />
                            <h6 className="card-title">Countries Reached</h6>
                        </Card.Body>
                    </Card>
                    <Card
                        style={{
                            maxWidth: "700px",
                            minWidth: "220px",
                            flexGrow: 1,
                            flexBasis: "220px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
                                style={{ fontSize: "30px" }}
                                end={2}
                                duration={2}
                                // start={100 - 30}
                                useEasing={true}
                            />
                            <h6 className="card-title">
                                LinkIT Frontend Rewrites
                            </h6>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="linkit-row">
                <Card
                    style={{
                        maxWidth: "1500px",
                        minWidth: "300px",
                        flexGrow: 1,
                        flexBasis: "300px",
                        height: "fit-content",
                    }}
                >
                    <Card.Body>
                        <div
                            className="chart-container"
                            style={{
                                position: "relative",
                                height: "330px",
                            }}
                        >
                            <Line options={lineOptions} data={data} />
                        </div>
                        <Card.Title>Accumulated Clicks</Card.Title>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        maxWidth: "1500px",
                        minWidth: "300px",
                        flexGrow: 1,
                        flexBasis: "300px",
                        height: "fit-content",
                    }}
                >
                    <Card.Body>
                        <div
                            className="chart-container"
                            style={{
                                position: "relative",
                                height: "330px",
                                width: "100%",
                            }}
                        >
                            <Bar options={barOptions} data={barData} />
                        </div>
                        <Card.Title>Aggregated Clicks HOD</Card.Title>
                    </Card.Body>
                </Card>
            </div>
            <div className="linkit-row">
                <Card
                    style={{
                        maxWidth: "1500px",
                        minWidth: "300px",
                        flexGrow: 1,
                        flexBasis: "300px",
                        height: "fit-content",
                    }}
                >
                    <Card.Body>
                        <div
                            className="chart-container"
                            style={{
                                position: "relative",
                                height: "330px",
                            }}
                        >
                            <Line options={lineOptions} data={data} />
                        </div>
                        <Card.Title>Accumulated Clicks</Card.Title>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        maxWidth: "1500px",
                        minWidth: "300px",
                        flexGrow: 1,
                        flexBasis: "300px",
                        height: "fit-content",
                    }}
                >
                    <Card.Body>
                        <ComposableMap
                            projection="geoMercator"
                            style={{
                                position: "relative",
                                height: "330px",
                                width: "100%",
                            }}
                        >
                            <Geographies geography={geoUrl}>
                                {({ geographies }: any) =>
                                    geographies.map((geo: any) => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colorScale(
                                                Math.random() * 3000
                                            )}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                        </ComposableMap>
                        <Card.Title>Clicks per Country</Card.Title>
                    </Card.Body>
                </Card>
            </div>
            <div className="linkit-row">
                <footer className="fas fa-print me-3 text-secondary">
                    Made by digIT'20
                </footer>
            </div>
        </div>
    );
}

export default UserPage;
