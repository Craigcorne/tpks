import jwt from 'jsonwebtoken';
import mg from 'mailgun-js';
import dotenv from 'dotenv';
import axios from 'axios';
 // import datetime from 'node-datetime';
 dotenv.config();
  const passkey = process.env.PASSKEY;
  const shortcode = process.env.SHORTCODE;
  const consumerKey = process.env.CONSUMERSECRET;
  const consumerSecret = process.env.CONSUMERSECRET;
  

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });
  export const payOrderEmailTemplate = (order) => {
    return `<h1>Thanks for shopping with us</h1>
    <p>
    Hi ${order.user.name},</p>
    <p>We have finished processing your order.</p>
    <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
    <table>
    <thead>
    <tr>
    <td><strong>Product</strong></td>
    <td><strong>Quantity</strong></td>
    <td><strong align="right">Price</strong></td>
    </thead>
    <tbody>
    ${order.orderItems
      .map(
        (item) => `
      <tr>
      <td>${item.name}</td>
      <td align="center">${item.quantity}</td>
      <td align="right"> $${item.price.toFixed(2)}</td>
      </tr>
    `
      )
      .join('\n')}
    </tbody>
    <tfoot>
    <tr>
    <td colspan="2">Items Price:</td>
    <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2">Shipping Price:</td>
    <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
    </tr>
    <tr>
    <td colspan="2"><strong>Total Price:</strong></td>
    <td align="right"><strong> $ksh{order.totalPrice.toFixed(2)}</strong></td>
    </tr>
    <tr>
    <td colspan="2">Payment Method:</td>
    <td align="right">${order.paymentMethod}</td>
    </tr>
    </table>
    <h2>Shipping address</h2>
    <p>
    ${order.shippingAddress.fullName},<br/>
    ${order.shippingAddress.address},<br/>
    ${order.shippingAddress.city},<br/>
    ${order.shippingAddress.country},<br/>
    ${order.shippingAddress.postalCode}<br/>
    </p>
    <hr/>
    <p>
    Thanks for shopping with us.
    </p>
    `;
  };
 
  
  
  const newPassword = process.env.PASSKEY;
  // const newPassword = () => {
  //     const dt = datetime.create();
  //     const formatted = dt.format('YmdHMS');
  
  //     const passString = shortcode + passkey + formatted;
  //     const base64EncodedPassword = Buffer.from(passString).toString('base64');
  
  //     return base64EncodedPassword;
  // };
  
  export const mpesaPassword = (req, res) =>{
      res.send(newPassword());
  };
  export const token = (req, res, next) =>{
  
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
  export const stkpush = (req, res) => {
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