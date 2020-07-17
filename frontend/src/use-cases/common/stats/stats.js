import React, { useState, useEffect, useRef } from "react";
import { DigitText, DigitLayout } from "@cthit/react-digit-components";
import CountUp from "react-countup";
import { Line } from "react-chartjs-2";
import {
    getYearSessions,
    getMonthSessions,
    getAvgHourSessions,
    getCountrySessions,
} from "../../../services/data.service";
import { VectorMap } from "react-jvectormap";
import { getCountryName } from "./stupid";

const styles = {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh",
    },
};

const Stats = (item, close) => {
    const [yearData, setYearData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [dayData, setDayData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("SE");
    const refMap = useRef(null);

    useEffect(() => {
        getYearSessions().then(data => setYearData(data.data));
        getMonthSessions().then(data => setMonthData(data.data));
        getAvgHourSessions().then(data => setDayData(data.data));
        getCountrySessions().then(data =>
            setCountryData(
                data.data.reduce((prev, curr) => {
                    prev[curr.country] = curr.clicks;
                    return prev;
                }, {})
            )
        );
    }, []);

    const _yearData = {
        labels: yearData.map(item => {
            return new Date(item.month).toLocaleString("default", {
                month: "short",
            });
        }),
        datasets: [
            {
                label: "Clicks",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: yearData.map(item => item.clicks),
            },
        ],
    };

    const _monthData = {
        labels: monthData.map(item => {
            return new Date(item.date).getDate().toString();
        }),
        datasets: [
            {
                label: "Clicks",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: monthData.map(item => item.clicks),
            },
        ],
    };

    const _dayData = {
        labels: dayData.map(item => item.hour),
        datasets: [
            {
                label: "Clicks",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: dayData.map(item => parseInt(item.clicks)),
            },
        ],
    };
    return (
        <div style={{ minWidth: "560px" }}>
            <DigitLayout.Column margin="50px">
                <div>
                    <DigitText.Heading4 text={item.item.shortcut} alignCenter />
                    <a href={item.item.linkurl}>
                        <DigitText.Subtitle2
                            text={item.item.linkurl}
                            alignCenter
                        />
                    </a>
                </div>
                <div className="MuiTypography-alignCenter">
                    <CountUp
                        end={123123}
                        duration={1}
                        suffix=" total clicks"
                        className="MuiTypography-h5"
                    />
                </div>
                <DigitText.Title
                    text="Clicks per month (last year)"
                    alignCenter
                />
                <Line data={_yearData} />
                <DigitText.Title
                    text="Clicks per day (last month)"
                    alignCenter
                />
                <Line data={_monthData} />
                <DigitText.Title
                    text="Average clicks per hour (all time)"
                    alignCenter
                />
                <Line data={_dayData} />
                <DigitText.Title
                    text="Clicks per country (all time)"
                    alignCenter
                />
                <div style={{ width: "100%", height: 300 }}>
                    <VectorMap
                        map={"world_mill"}
                        backgroundColor="#3b96ce"
                        containerStyle={{
                            width: "100%",
                            height: "100%",
                        }}
                        ref={refMap}
                        series={{
                            regions: [
                                {
                                    values: countryData,
                                    scale: ["#ffffff", "#09cdda"],
                                },
                            ],
                        }}
                        onRegionClick={(event, code) =>
                            setSelectedCountry(code)
                        }
                        alignCenter
                        containerClassName="map"
                    />
                </div>
                <DigitText.Subtitle
                    text={
                        getCountryName(selectedCountry) +
                        ": " +
                        (countryData[selectedCountry] ?? 0)
                    }
                    alignCenter
                />
            </DigitLayout.Column>
        </div>
    );
};
export default Stats;
