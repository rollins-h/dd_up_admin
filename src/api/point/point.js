import request from '@/utils/request'

export default{
    updateAccountBalance(account){
        return request({
            url: `/service/point-account/updateCustomerAccount`,
            method: 'post',
            data:account
          })
    },
    getPointLogList(current,limit,logQuery){
        return request({
            url: `/service/point-log/getPointLogList/${current}/${limit}`,
            method: 'post',
            data:logQuery
          })
    },
}