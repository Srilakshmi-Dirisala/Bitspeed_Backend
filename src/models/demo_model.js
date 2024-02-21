

const { db } = require('../../database');

// Function to identify contacts based on email or phone number
const identifyModel = async (email, phoneNumber) => {
    try {
        // Construct SQL query
        const sql = `
            SELECT *
            FROM Contact_new
            WHERE email = ? OR phoneNumber = ?
        `;

       console.log("sql",sql);
       const contacts=await new Promise((resolve,reject)=>{
        db.all(sql,[email,phoneNumber],(err,rows)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
       })
        return contacts;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
const findExistingContact = async (phoneNumber, email) => {
    try {
        console.log("phoneNumber",phoneNumber,email);
        const sql = `
            SELECT id FROM Contact_new WHERE phoneNumber = ? OR email = ?
        `;
        const contacts=await new Promise((resolve,reject)=>{
            db.all(sql,[phoneNumber,email],(err,rows)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(rows)
                }
            })
           })
           return contacts
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
const addUsersModel = async (phoneNumber, email) => {
    try {
        let linkedId = null;
        const existingContact = await findExistingContact(phoneNumber, email);
      console.log("existingContact",existingContact);
      if (existingContact.length > 0) {
        // If there are existing contacts, designate one as the primary contact
        // and use its ID as the linkedId for the new contact
        linkedId = existingContact[0].id;
    }
        const linkPrecedence = linkedId ? 'secondary' : 'primary';
     
        const sql = `
        INSERT INTO Contact_new (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt) 
        VALUES (?,?,?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
    `;
       const contacts=await new Promise((resolve,reject)=>{
        db.all(sql,[phoneNumber, email, linkedId, linkPrecedence],(err,rows)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
       })
        return contacts;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}
module.exports = {
    identifyModel,addUsersModel
}
