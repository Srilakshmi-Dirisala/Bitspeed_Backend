const { identifyModel,addUsersModel } = require('../models/demo_model');

const identifyServices = async (req, res) => {
    try {
        const { email, phoneNumber } = req.body;

        // Check if either email or phoneNumber is provided
        if (!email && !phoneNumber) {
            return{status:400,message:"Either phone number and email are missed",data:[]}
        }

        // Call the model function to identify contacts based on email or phoneNumber
        let contacts = await identifyModel(email, phoneNumber);

        // Consolidate contact details as per the provided requirements
        let primaryContactId = null;
        let emails = [];
        let phoneNumbers = [];
        let secondaryContactIds = [];

        contacts.forEach(contact => {
            if (contact.linkPrecedence === 'primary') {
                primaryContactId = contact.id;
                emails.push(contact.email);
                phoneNumbers.push(contact.phoneNumber);
            } else if (contact.linkPrecedence === 'secondary') {
                secondaryContactIds.push(contact.id);
            }
        });

       const contact= {
            "primaryContatctId": primaryContactId,
            "emails": emails,
            "phoneNumbers": phoneNumbers,
            "secondaryContactIds": secondaryContactIds
        }
        return{status:200,message:"success",data:contact}
    } catch (error) {
        console.error("Error:", error);
        return{status:500,message:"Internal Server Error",data:[]}
    }
}

const addUsersServices = async (req, res) => {
    try {
        const { phoneNumber, email } = req.body;

        // Check if either email or phoneNumber is provided
        if (!email && !phoneNumber) {
            return{status:400,message:"Either phone number and email are missed",data:[]}
        }

        // Call the model function to identify contacts based on email or phoneNumber
        let contacts = await addUsersModel(phoneNumber, email);

        // Consolidate contact details as per the provided requirements
       

        return{status:200,message:"success",data:contacts}
    } catch (error) {
        console.error("Error:", error);
        return{status:500,message:"Internal Server Error",data:[]}
    }
}
module.exports = {
    identifyServices,addUsersServices
}
