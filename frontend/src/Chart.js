import React, {Component} from 'react';
import {BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    render() {

        var data = [];
        if (this.props.items !== null) {

            if (this.props.graphType === '1') {
                const stat = this.prepareFor1();
                return this.getBarChart(stat);
            }
            else if (this.props.graphType === '3') {
                const stat = this.prepareFor3();
                return this.getBarChart(stat);
            } else {
                const stat = this.prepareFor2();
                return this.getLineChart(stat);
            }
        } else {
            return (<strong>nothing</strong>);
        }

    }

    getLineChart(stat) {
        console.log(stat.min)
        return (

            <LineChart width={500} height={300} data={stat.data}>
                <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis
                    dataKey={'datum'}
                />
                <YAxis
                    name='stature'
                    unit='kg'
                    domain={[stat.min,stat.max]}
                    type="number"

                />
                <Tooltip/>
            </LineChart>

        );
    }

    getBarChart(stat) {
        return (
            <BarChart width={500} height={300} data={stat.data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis
                    domain={[0, stat.max]}
                    type="number"
                />
                <Tooltip/>
                <Bar dataKey='count' fill='#8884d8'/>

            </BarChart>
        );
    }


    convertTimestamp(stamp) {
        var date = new Date(stamp * 1000);
        var month = parseInt(date.getMonth(), 10);
        month++;
        return date.getDate() + '.' + month + '.' + date.getFullYear();
    }


    prepareFor1() {
        var data = [];
        var i = 0;
        var max = 0;
        var min = 100000;
        this.props.items.map((item) => {
            data[i] = {
                count: item.value,
                name: this.convertTimestamp(item.timestamp),
                timestamp: item.timestamp,
            };
            if (item.value > max) {
                max = item.value;
            }
            if (item.value < min) {
                min = item.value;
            }
            i = i + 1;
        });

        data.sort(this.reverseOrder());

        return {'data': data, 'max': max};
    }

    prepareFor2() {

        var max = 0;
        var min = 150;
        var data = [];
        this.props.items.map(((item) => {
            if (item.value > max) {
                max = item.value;
            }
            if (item.value < min) {
                min = item.value;
            }
            data.push({
                datum: this.convertTimestamp(item.timestamp),
                value: item.value,
                timestamp: item.timestamp,
            });

            data.sort(this.reverseOrder());
        }));
        return {'data': data, 'max': max, 'min': min};
    }

    prepareFor3() {
        var data = [];
        var i = 0;
        var count = 0;
        var max = 0;
        this.props.items.map((item) => {
            if (item.value == '2') {
                count = count + 1;
            }
            if (item.value == '1') {
                data[i] = {
                    count: count,
                    name: this.convertTimestamp(item.timestamp),
                    timestamp: item.timestamp,
                };
                i = i + 1;
                if (count > max) {
                    max = count;
                }
                count = 0;
            }
        });

        data.sort(this.reverseOrder());

        return {'data': data, 'max': max};
    }

    reverseOrder() {
        return function (a, b) {
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            if (a.timestamp >= b.timestamp) {
                return 1;
            }
            return true;
        }
    }

}

export default Chart;
