import store from 'store'

// 1. 往本地存储数据
export const saveObj = (key, obj)=>{
    store.set(key, obj);
};

// 2. 从本地获取数据
export const getObj = (key)=>{
    return store.get(key) || {};
};

// 3. 从本地移除数据
export const removeObj = (key)=>{
    store.remove(key);
};