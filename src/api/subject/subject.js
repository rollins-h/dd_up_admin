import request from '@/utils/request'

export default{

    getListPage(current,limit,groupQuery){
        return request({
            url: `/service/question-group/pageCondition/${current}/${limit}`,
            method: 'post',
            data:groupQuery
          })
    },
    removeById(id){
        return request({
            url: `/service/question-group/${id}`,
            method: 'delete',
          })
    },
    addSubject(subjectGroup){
        return request({
            url:`/service/question-group/addQuestionGroup`,
            method:'post',
            data:subjectGroup
        })
    },
    updateSubject(subjectGroup){
        return request({
            url:`/service/question-group/updateQuestionGroup`,
            method:'post',
            data:subjectGroup
        })
    },
    getById(id){
        return request({
            url:`/service/question-group/getById/${id}`,
            method: 'get'
        })
    },
    getEnumList(){
        return request({
            url:`/service/question-group/getEnumList/`,
            method: 'get'
        })
    }
}
