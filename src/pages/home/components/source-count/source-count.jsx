import React from 'react'
import ReactEcharts  from 'echarts-for-react'

import { Card } from 'antd'

export default class SourceCount extends React.Component{
    getOption = ()=>{
      return {
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
          }]
      }
    };

    render() {
        return (
           <Card title={"各版块资源总数量统计"}>
               <ReactEcharts option={this.getOption()} />
           </Card>
        )
    }
}
