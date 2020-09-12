import {
    GET_ALL_ITEM,
    DEL_TODO_ITEM,
    CHANGE_TODO_ITEM,
    ADD_TODO_ITEM,
    REMOVE_FINISHED_TODO_ITEM,
    IS_CHECKED_ALL_OR_NOT_TODO
} from './actionTypes'

// 默认的状态
const defaultState = {
    todos: [],
    finishedCount: 0
};

// 唯一处理状态的地方
export default (state = defaultState, action) => {
    // 1. 获取所有的todo
    if (action.type === GET_ALL_ITEM) {
        // 深拷贝
        let newState = JSON.parse(JSON.stringify(state));
        newState.todos = action.todos;
        return newState;
    }
    // 2. 删除单个todo
    if (action.type === DEL_TODO_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        // 1. 遍历
        let tempFinishedCount = 0;
        newState.todos.forEach((todo, index) => {
            if (todo.id === action.todoId) {
                newState.todos.splice(index, 1);
            }
        });

        newState.todos.forEach((todo, index) => {
            if (todo.finished) {
                tempFinishedCount += 1;
            }
        });

        // 2. 更新状态
        newState.finishedCount = tempFinishedCount;
        return newState
    }
    // 3. 修改一个todo的完成状态
    if (action.type === CHANGE_TODO_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        // 1. 遍历
        let tempFinishedCount = 0;
        newState.todos.forEach((todo, index) => {
            if (todo.id === action.todoId) {
                todo.finished = action.flag;
            }
        });

        newState.todos.forEach((todo, index) => {
            if (todo.finished) {
                tempFinishedCount += 1;
            }
        });

        // 2. 更新状态机
        newState.finishedCount = tempFinishedCount;
        return newState
    }
    // 4. 添加todo一个
    if (action.type === ADD_TODO_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.todos.push(action.todo);
        return newState
    }
    // 5. 删除所有已经完成的todo
    if (action.type === REMOVE_FINISHED_TODO_ITEM) {
        let newState = JSON.parse(JSON.stringify(state));
        let tempArr = [];
        newState.todos.forEach((todo, index)=>{
            if(!todo.finished){ // 该任务没有完成
                tempArr.push(todo);
            }
        });
        newState.todos = tempArr;
        newState.finishedCount = 0;
        return newState
    }
    // 6. 全选和取消全选
    if (action.type === IS_CHECKED_ALL_OR_NOT_TODO) {
        let newState = JSON.parse(JSON.stringify(state));
        let tempFinishedCount = 0;
        newState.todos.forEach((todo, index)=>{
            if(todo.finished !== action.flag){
                todo.finished = action.flag;
            }
        });

        // 1.1 处理选中的
        newState.todos.forEach((todo, index)=>{
            if(todo.finished){
                tempFinishedCount += 1;
            }
        });

        newState.finishedCount = tempFinishedCount;
        return newState
    }
    return state;
}
