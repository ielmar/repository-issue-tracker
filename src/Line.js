import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function Line({ openIssues, closedIssues }) {
  const myChartRef = useRef(null);
  let openedIssuesData = {};
  let closedIssuesData = {}

  // find the unique dates from opened issues
  openIssues.map((issue) => {
    const date = new Date(issue.created_at.substring(0,10))
    const formattedDate = new Intl.DateTimeFormat('en-US').format(date)

    if (!openedIssuesData[formattedDate]) {
      openedIssuesData[formattedDate] = 0;
      closedIssuesData[formattedDate] = 0;
    }

    openedIssuesData[formattedDate]++;
  });

  // find the unique dates from closed issues
  closedIssues.map((issue) => {
    let date = new Date(issue.closed_at.substring(0,10))
    let formattedDate = new Intl.DateTimeFormat('en-US').format(date)
    
    if(!closedIssuesData[formattedDate]){
      closedIssuesData[formattedDate] = 0;
    }

    closedIssuesData[formattedDate]++;

    // add created_at date to openedIssuesData if not already exists
    date = new Date(issue.created_at.substring(0,10))
    formattedDate = new Intl.DateTimeFormat('en-US').format(date)

    if(!openedIssuesData[formattedDate]){
      openedIssuesData[formattedDate] = 0;
    }
    
    openedIssuesData[formattedDate]++
  })

  //sort by date descending
  const uniqueDates = Object.keys(openedIssuesData).sort((a,b) => new Date(a) - new Date(b))
  const openedIssuesValues = uniqueDates.map(key => openedIssuesData[key])
  const closedIssuesValues = uniqueDates.map(key => closedIssuesData[key])

  const option = {
    title: {
      text: "Opened/Closed Issues",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: 'category',
      data: uniqueDates
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Opened issues',
        data: openedIssuesValues,
        type: 'line'
      },
      {
        name: 'Closed Issues',
        data: closedIssuesValues,
        type: 'line'
      }
    ]
  };

  useEffect(() => {
    let MyChart = null;
    if (myChartRef.current !== null) {
      MyChart = echarts.init(myChartRef.current);
    }

    MyChart.setOption(option);

    return () => MyChart.dispose()
  }, [option]);

  return (
    <div
      className="line"
      ref={myChartRef}
      style={{ width: '100%', height: '300px' }}
    ></div>
  );
}
