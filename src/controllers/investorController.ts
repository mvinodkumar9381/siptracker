import { fetchAllInvestors, fetchInvestorAnalytics } from '../models/investorModel.js'
import {insertInvestor,fetchInvestor,fetchHoldings,calculateNetworth} from '../models/investorModel.js'
const signJWT = require('../utility/AuthManager.js')
import express,{Request,Response} from 'express'    

export const invalidTokens: string[] = []

export const createInvestor = async (req:Request, res:Response) => {

    try {

        const result = await insertInvestor(req.body)

        return res.status(201).json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getInvestor = async (req:Request, res:Response) => {

    try {

        const result = await fetchInvestor(req.params.investorId as string)

        if (!result) {
            return res.status(404).send('Investor not found')
        }

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getInvestorHoldings = async (req:Request, res:Response) => {

    try {

        const result = await fetchHoldings(req.params.investorId as string)

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getInvestorNetworth = async (req:Request, res:Response) => {

    try {

        const result = await calculateNetworth(req.params.investorId as string)

        return res.json(result)

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const login = async (req:Request, res:Response) => {

    try {

        const { email } = req.body

        const token = signJWT({
            email: email,
            role: 'investor'
        })

        return res.json({
            message: 'Login Successful',
            token: token
        })

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const logout = async (req:Request, res:Response) => {

    try {

        const token: string = req.headers.authorization as string

        invalidTokens.push(token)

        return res.json({
            message: 'Logout Successful'
        })

    } catch (err: any) {

        return res.status(500).send(err.message)
    }
}

export const getAllInvestors = async (req:Request, res:Response) => {
  try {
    const investors = await fetchAllInvestors();
    res.status(200).json({
      success: true,
      data: investors,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getInvestorAnalytics = async (req:Request, res:Response) => {
  try {
    const analytics = await fetchInvestorAnalytics();

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

