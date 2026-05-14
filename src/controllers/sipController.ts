import { createSIP as createSIPModel, getSIP as getSIPModel, processSIP as processSIPModel, getTransactions as getTransactionsModel, calculateNAV } from '../models/sipModel'
import express,{Request,Response} from 'express'


export const createSIP = async (req:Request, res:Response) => {

    try {

        const result = await createSIPModel(req.body)

        return res.status(201).json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getSIP = async (req:Request, res:Response) => {

    try {

        const result = await getSIPModel(req.params.sipId as string)

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const processSIP = async (req:Request, res:Response) => {

    try {

        req.body.sip_id = req.params.sipId

        const result = await processSIPModel(req.body)

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getTransactions = async (req:Request, res:Response) => {

    try {

        // const { sipId } = req.params;

        // console.log("SIP ID:", sipId);

        const result = await getTransactionsModel();

        console.log(result);

        return res.json(result);

    } catch (err: any) {

        return res.status(500).send(err.message);
    }
};

export const getNAV = async (req:Request, res:Response) => {

    try {

        const result =
            await calculateNAV(req.params.sipId as string)

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}


