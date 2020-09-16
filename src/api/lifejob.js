import ajax from './index'

// 1.获取学前所属分类
export const getJobPre = ()=>ajax('/api/auth/life_job/job_pre');

// 2.获取所属家园分类
export const getJobFamily = ()=>ajax('/api/auth/life_job/job_family');

// 3.添加一条人生资源
export const  addOneJob = (token, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, is_focus, focus_img)=>ajax('/api/auth/life_job/add', {token, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, is_focus, focus_img}, 'post');
