import React from 'react'
import ReactEcharts  from 'echarts-for-react'
import { Card, message} from 'antd'

import {getSourceCount} from './../../../../api/homeApi'

export default class SourceCount extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._loadData();
    }

    _loadData = ()=>{
       getSourceCount().then((result)=>{
           if(result.data && result.data.status === 1){
               
               let tempArr = [];
               for(let k in result.data.data){
                   tempArr.push(result.data.data[k]);
               }
               // 更新状态机
               this.setState({
                  data:  tempArr
               });
           }
       }).catch((error)=>{
           console.log(error);
           message.error('获取统计数据失败!');
       })
    };


    getOption = ()=>{
      return {
          xAxis: {
              type: 'category',
              data: ['活动', '职场', '直播', '幼教']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: this.state.data,
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
