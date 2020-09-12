import {
    GET_ALL_ITEM,
    DEL_TODO_ITEM,
    CHANGE_TODO_ITEM,
    ADD_TODO_ITEM,
    REMOVE_FINISHED_TODO_ITEM,
    IS_CHECKED_ALL_OR_NOT_TODO
} from './actionTypes'


// 1. 获取所有的todo
/*export const getAllTodoAction = (todos)=> ({
    type: GET_ALL_ITEM,
    todos
});*/

export const getAllTodoAction = ()=> {
    return (dispath)=>{
        // 异步操作
        const  todos =  [
            {id: 1, title: '学习2个小时的react课程', finished: false},
            {id: 2, title: '学习3个小时的web服务器课程', finished: false},
            {id: 3, title: '学习1个小时的数据库课程', finished: false},
            {id: 4, title: '刷2小时抖音', finished: false}
        ];
        dispath({
            type: GET_ALL_ITEM,
            todos
        });
    }
};

// 2. 删除单个todo
export const delTodoAction = (todoId)=> ({
    type: DEL_TODO_ITEM,
    todoId
});


// 3. 修改一个todo的完成状态
export const changeTodoAction = (todoId, flag)=> ({
    type: CHANGE_TODO_ITEM,
    todoId,
    flag
});

// 4. 添加todo一个
export const addTodoAction = (todo)=> ({
    type: ADD_TODO_ITEM,
    todo
});

// 5. 删除所有已经完成的todo
export const delFinishedTodoAction = ()=> ({
    type: REMOVE_FINISHED_TODO_ITEM
});

// 6. 全选和取消全选
export const isCheckedAllAction = (flag)=> ({
    type: IS_CHECKED_ALL_OR_NOT_TODO,
    flag
});
