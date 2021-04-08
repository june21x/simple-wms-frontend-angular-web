/*
    generateID() function:
        Generates a random number ID of varying length,
        depending on input type. (return a string)

        Inputs:
            - 'Order ID'            starts with '40', length is 10
            - 'Transaction ID'      length is 12
            - 'Label ID'            starts with '20', length is 8
            - 'Pallet ID'           length is 4
            - 'Crate ID'            length is 4
            - 'Tracking Number'     length is 8


    getTimestamp() function:
        Returns the current time as a timestamp. (JSON - ie. "2021-04-08 04:56:30")


    generateTimestamp() function:
        Returns a random timestamp some time in the past.


    NOTE: Timestamp() functions don't currently account for timezones.
*/

function generateID(type) {
    if (type == 'OrderID' || type == 'Order ID') {
        const OrderID = "40" + (Math.floor(10000000 + Math.random() * 90000000)).toString();
        return OrderID;
    } else if (type == 'TransactionID' || type == 'Transaction ID') {
        const TransactionID = (Math.floor(100000000000 + Math.random() * 900000000000)).toString();
        return TransactionID;
    } else if (type == 'LabelID' || type == 'Label ID') {
        const LabelID = "20" + (Math.floor(100000 + Math.random() * 900000)).toString();
        return LabelID;
    } else if (type == 'PalletID' || type == 'Pallet ID' || type == 'CrateID' || type == 'Crate ID') {
        const PalletCrateID = (Math.floor(1000 + Math.random() * 9000)).toString();
        return PalletCrateID;
    } else if (type == 'TrackingNumber' || type == 'Tracking Number') {
        const TrackingNumber = (Math.floor(10000000 + Math.random() * 90000000)).toString();
        return TrackingNumber;
    } else {    // exception, return random string of length 6
        const ExceptionID = (Math.floor(1000000 + Math.random() * 900000)).toString();
        return ExceptionID;
    }
}

function getTimestamp() {
    const CurrentTime = new Date(Date.now()).toISOString().slice(0,19).replace('T', ' ');
    return CurrentTime;
}

function generateTimestamp() {  // Date.now() returns milliseconds, so to change in 'days' magnitude, 
    const TimeModifier = Math.floor(Math.random()*10000000000);
    const GeneratedTime = new Date(Date.now()-TimeModifier).toISOString().slice(0,19).replace('T', ' ');
    return GeneratedTime;
}

module.exports = {
    generateID,
    getTimestamp,
    generateTimestamp
};