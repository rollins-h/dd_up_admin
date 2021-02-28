import request from '@/utils/request'

export default{
    getGuideList(current,limit,guideQuery){
        return request({
            url: `/service/guide/getGuides/${current}/${limit}`,
            method: 'post',
            data:guideQuery
          })
    },
    removeById(id){
        return request({
            url: `/service/guide/${id}`,
            method: 'delete',
          })
    },
    addGuide(guideForm){
        return request({
            url:`/service/guide/addGuide`,
            method:'post',
            data:guideForm
        })
    },
    updateGuide(guideForm){
        return request({
            url:`/service/guide/updateGuide`,
            method:'post',
            data:guideForm
        })
    },
    getById(id){
        return request({
            url:`/service/guide/getById/${id}`,
            method: 'get'
        })
    },
}