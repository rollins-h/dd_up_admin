import request from '@/utils/request'

export default{
    getFeedbackList(current,limit,customerQuery){
        return request({
            url: `/service/feedback/getFeedbackList/${current}/${limit}`,
            method: 'post'
          })
    },
}