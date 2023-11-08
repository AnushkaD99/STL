import Billing from '../models/billing.model.js';

// get all billing details
export const getBillDeails = async (req, res) => {
    try {
        const billDetails = await Billing.findAll({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(billDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

// add billing details
export const addBillDetails = async (req, res) => {
    try {
        const billDetails = await Billing.create(req.body);
        res.status(200).json(billDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

// get last billing details
export const getLastBillDetails = async (req, res) => {
    try {
        const billDetails = await Billing.findOne({
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json(billDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}

//get details by ID
export const getBillDeailsById = async (req, res) => {
    try {
        const billDetails = await Billing.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(billDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }

}
