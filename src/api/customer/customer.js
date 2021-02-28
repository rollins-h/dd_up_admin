import request from '@/utils/request'

export default{
    getCustomerList(current,limit,customerQuery){
        return request({
            url: `/service/customer/getCustomerList/${current}/${limit}`,
            method: 'post',
            data:customerQuery
          })
    },
    getCustomers(){
        return request({
            url: `/service/customer/getCustomers`,
            method: 'get'
        })
    },
}