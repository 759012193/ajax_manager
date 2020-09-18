import React from 'react'
import ReactEcharts  from 'echarts-for-react'
import {Card, message} from 'antd'
import {getBuyCount} from './../../../../api/homeApi'

export default class BuyCount extends React.Component{
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
        getBuyCount().then((result)=>{
            if(result.data && result.data.status === 1){
                // console.log(result.data);
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
      const {data} = this.state;
      return {
          title: {
              text: '引擎计划各资源购买统计',
              subtext: '引擎1号',
              left: 'center'
          },
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['活动专区', '职场人生', '直播课堂', '幼教资源']
          },
          series: [
              {
                  name: '购买数量',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                      {value: data[0], name: '活动专区'},
                      {value: data[1], name: '职场人生'},
                      {value: data[2], name: '直播课堂'},
                      {value: data[3], name: '幼教资源'}
                  ],
                  emphasis: {
                      itemStyle: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      }
    };

    render() {
        return (
           <Card title={"各业务购买数量统计"}>
               <ReactEcharts option={this.getOption()} />
           </Card>
        )
    }
}
