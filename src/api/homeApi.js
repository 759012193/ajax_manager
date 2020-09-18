import ajax from './index'

// 1. 获取各版块资源的数量
export const getSourceCount = ()=>ajax('/api/auth/home/source_count');

// 2. 各个资源的总购买数量
export const getBuyCount = ()=>ajax('/api/auth/home/buy_count');
