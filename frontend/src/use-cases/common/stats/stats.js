import React, { useState, useEffect } from "react";
import { DigitText, DigitLayout } from "@cthit/react-digit-components";
import CountUp from "react-countup";
import { Line } from "react-chartjs-2";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
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
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const styles = {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh",
    },
};

const Stats = (item, close) => {
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
                <Line data={data} />
            </DigitLayout.Column>
        </div>
    );
};
export default Stats;
