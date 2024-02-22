
import { UserManager } from '../../manager/UserManager';
import { AppUtil, getBaseURL } from '../AppUtils';

export const Service = {

    get: (endPoint, success, error) => {
        AppUtil.onLoding(true);
        console.log('-----Request----->', getBaseURL() + endPoint);

        fetch(`${getBaseURL()}${endPoint}`)
            .then((res) => res.json()).then((res) => {
                AppUtil.onLoding(false);
                console.log("++++++ Response ++++++> ", getBaseURL() + endPoint, res);
                return success(res)
            }).catch((err) => {
                // Loger.onLog('err', err);
                return error(err)
            })
    },

    getUsingToken: (endPoint, success, error,) => {
        AppUtil.onLoding(true);
        console.log('-----Request----->', getBaseURL() + endPoint);

        fetch(`${getBaseURL()}${endPoint}`,{  method: 'GET',
        headers: {
            'Authorization': `Bearer ${UserManager.token}`,
            'Content-Type': 'application/json',
            // Add other headers as needed
        },})
            .then((res) => res.json()).then((res) => {
                AppUtil.onLoding(false);
                console.log("++++++ Response ++++++> ", getBaseURL() + endPoint, res);
                return success(res)
            }).catch((err) => {
                // Loger.onLog('err', err);
                return error(err)
            })
    },


    postFormDataFetch: (endPoint, data, success, error) => {

        AppUtil.onLoding(true);
        console.log('-----Request----->', getBaseURL() + endPoint, data);

        fetch(`${getBaseURL()}${endPoint}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-type": "multipart/form-data",
            },
            body: data,
        }).then((res) => res.json()).then((res) => {
            AppUtil.onLoding(false);
            console.log("++++++ Response ++++++> ", getBaseURL() + endPoint, res);
            return success(res)
        }).catch((err) => {
            AppUtil.onLoding(false);
            return error(err)
        })
    }


}