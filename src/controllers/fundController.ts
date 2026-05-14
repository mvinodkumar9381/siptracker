import {insertFund,fetchFunds,updateFundNAV} from '../models/fundModel'

import express,{Request,Response} from 'express'


export const createFund = async (req:Request, res:Response) => {

    try {

        const result = await insertFund(req.body)

        return res.status(201).json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getFunds = async (req:Request, res:Response) => {

    try {

        const result = await fetchFunds()

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const updateNAV = async (req:Request, res:Response) => {

    try {

        req.body.fund_id = req.params.fundId

        const result = await updateFundNAV(req.body)

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

