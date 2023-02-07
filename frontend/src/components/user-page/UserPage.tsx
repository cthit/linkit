import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import CountUp from "react-countup";

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => 7),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => 3),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
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
                            minWidth: "200px",
                            flexGrow: 1,
                            flexBasis: "200px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
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
                            minWidth: "200px",
                            flexGrow: 1,
                            flexBasis: "200px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
                                end={5231251312}
                                duration={2}
                                // start={100 - 30}
                                useEasing={true}
                            />
                            <h6 className="card-title">No. Links</h6>
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
                            minWidth: "200px",
                            flexGrow: 1,
                            flexBasis: "200px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
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
                            minWidth: "200px",
                            flexGrow: 1,
                            flexBasis: "200px",
                            height: "fit-content",
                        }}
                    >
                        <Card.Body>
                            <CountUp
                                className="h2 text-secondary"
                                end={5231251312}
                                duration={2}
                                // start={100 - 30}
                                useEasing={true}
                            />
                            <h6 className="card-title">No. Links</h6>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="linkit-row">
                <Card
                    style={{
                        maxWidth: "700px",
                        minWidth: "300px",
                        flexGrow: 1,
                        flexBasis: "300px",
                        height: "fit-content",
                    }}
                >
                    <Card.Body>
                        <Card.Title>Cool data</Card.Title>
                        <div
                            className="chart-container"
                            style={{
                                position: "relative",
                                height: "300px",
                            }}
                        >
                            <Line options={options} data={data} />
                        </div>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        maxWidth: "700px",
                        minWidth: "300px",
                        flexGrow: 1,
                        flexBasis: "300px",
                        height: "fit-content",
                    }}
                >
                    <Card.Body>
                        <Card.Title>Cool data</Card.Title>
                        <div
                            className="chart-container"
                            style={{
                                position: "relative",
                                height: "300px",
                                width: "100%",
                            }}
                        >
                            <Line options={options} data={data} />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default UserPage;
