import ajax from './index'

// 1.获取学前所属分类
export const getJobPre = ()=>ajax('/api/auth/life_job/job_pre');

// 2.获取所属家园分类
export const getJobFamily = ()=>ajax('/api/auth/life_job/job_family');

// 3.添加一条人生资源
export const  addOneJob = (token, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, focus_img)=>ajax('/api/auth/life_job/add', {token, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, focus_img}, 'post');

// 4.获取人生列表
export const getJobList = (page_num, page_size)=>ajax('/api/auth/life_job/list', {page_num, page_size});

// 5.设置是否首页轮播图
export const setFocusJob = (id, is_focus)=>ajax('/api/auth/life_job/set_focus_job', {id, is_focus});

// 6.删除一个人生
export const deleteOneJob = (id)=>ajax('/api/auth/life_job/delete_job', {id});

// 7.修改一条人生资源
export const  editOneJob = (token, job_id, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, focus_img)=>ajax('/api/auth/life_job/edit', {token, job_id, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, focus_img}, 'post');

