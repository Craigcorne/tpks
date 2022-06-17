import dotenv from 'dotenv';
import axios from 'axios';
import { response } from 'express';
// import datetime from 'node-datetime';

dotenv.config();
const passkey = process.env.PASSKEY;
const shortcode = process.env.SHORTCODE;
const consumerKey = process.env.CONSUMERSECRET;
const consumerSecret = process.env.CONSUMERSECRET;

const newPassword = process.env.PASSKEY;
// const newPassword = () => {
//     const dt = datetime.create();
//     const formatted = dt.format('YmdHMS');

//     const passString = shortcode + passkey + formatted;
//     const base64EncodedPassword = Buffer.from(passString).toString('base64');

//     return base64EncodedPassword;
// };

export default mpesaPassword = (req, res) =>{
    res.send(newPassword());
};
exports.token = (req, res, next) =>{

const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate";
 
const autho = 'Basic' + Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');

const headers = {
    Authorization: autho,
};

axios.get(url, {
 headers: headers,
})
.then((response) => {
    let data = response.data;
    let access_token = data.access_token;
    req.token = access_token;
    next();
})
.catch((error) => console.log(error));
};
exports.stkpush = (req, res) => {
    const token = req.token;

    const headers = {
        Authorization: 'Bearer' + token,
    };
    const stkURL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' 
    let data = {
     "BusinessShortCode":"174379",    
     "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",    
     "Timestamp":"20160216165627",    
     "TransactionType": "CustomerPayBillOnline",    
     "Amount":"1",    
     "PartyA":"254708374149",    
     "PartyB":"174379",    
     "PhoneNumber":"254708374149",    
     "CallBackURL":"https://mydomain.com/pat",    
     "AccountReference":"Test",    
     "TransactionDesc":"Test"

    };
    axios.post(stkURL, datat, {headers: headers})
    .then((response) => res.send(response.data));
};