import request from '@/utils/request'

export default{
    getListPage(current,limit,questionQuery){
        return request({
            url: `/service/question/pageCondition/${current}/${limit}`,
            method: 'post',
            data:questionQuery
          })
    },
    getQuestionType(){
        return request({
            url:`/service/question/getQuestionTypeList/`,
            method: 'get'
        })
    },
    addQuestion(questionForm){
        return request({
            url:`/service/question/addQuestion/`,
            method: 'post',
            data:questionForm
        })
    },
    updateQuestion(questionForm){
        return request({
            url:`/service/question/updateQuestion/`,
            method: 'post',
            data:questionForm
        })
    },
    getQuestionById(questionId){
        return request({
            url:`/service/question/getQuestionById/${questionId}`,
            method: 'get'
        })
    },
    deleteQuestionById(questionId){
        return request({
            url:`/service/question/deleteQuestionById/${questionId}`,
            method: 'delete'
        })
    },
}