const userModel = require('../models/userModels')
const societeModel = require('../models/societeModel')
const typeMaterielModel = require('../models/typeMaterielModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const serviceModel = require('../models/serviceModel')
const sourceAchatModel = require('../models/sourceachatModel')
const materielModel = require('../models/materielModel')

// register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser) {
            return res.status(200).send({message: 'User Already Exist', success:false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message: 'Register Successfully', success:true})
    } catch (error) {
        console.log(error);   
        res.status(500).send({success:false, message:`Register Controller ${error.message}`})
    }
}

// login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user) {
            return res.status(200).send({message:'User not found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(200).send({message:'Invalid Email or Password', success:false})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({message:'Login Success', success:true, token})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})
    }
}

const authController = async (req ,res) => {
    try {
        const user = await userModel.findById({_id: req.body.userId});
        user.password = undefined;
        if(!user) {
            return res.status(200).send({message: "user not found", success:false})
        } else {
            res.status(200).send({success:true, data: {name:user.name, email:user.email}})
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'auth error', success:false, error})
    }
}

const getSocietesController = async (req, res) => {
    try {
       const societes = await societeModel.find({}) 
       res.status(200).send({success:true, message:'societes data', data:societes})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching societes', error})
    }
}

const ajouterSocieteController = async (req, res) => {
    try {
        const newSociete = await societeModel({...req.body})
        await newSociete.save()
        res.status(201).send({success:true, message: "Societe added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, error, message:"Error While Applying For Societe"})
    }
}

const ajouterServiceController = async (req, res) => {
    try {
        const newService = await serviceModel({...req.body})
        await newService.save()
        res.status(201).send({success:true, message: "Service added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, error, message:"Error While Applying For Service"})
    }
}

const getTypeMaterielsController = async (req, res) => {
    try {
       const typeMateriels = await typeMaterielModel.find({}) 
       res.status(200).send({success:true, message:'type materiels data', data:typeMateriels})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching societes', error})
    }
}

const ajouterTypeMaterielController = async (req, res) => {
    try {
        const newTypeMateriel = await typeMaterielModel({...req.body})
        await newTypeMateriel.save()
        res.status(201).send({success:true, message: "Type materiel added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, error, message:"Error While Applying For Doctor"})
    }
}

const getMaterielsController = async (req, res) => {
    try {
       const materiels = await materielModel.find({}) 
       res.status(200).send({success:true, message:' materiels data', data:materiels})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching societes', error})
    }
}

const getServicesController = async (req, res) => {
    try {
       const services = await serviceModel.find({}) 
       res.status(200).send({success:true, message:'services data', data:services})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching services', error})
    }
}

const getSourcesAchatController = async (req, res) => {
    try {
       const sourcesAchat = await sourceAchatModel.find({}) 
       res.status(200).send({success:true, message:'sourcesAchat data', data:sourcesAchat})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching sourcesAchat', error})
    }
}

// const getTypeMaterielController 

module.exports = { loginController, registerController, authController, getSocietesController,
    getTypeMaterielsController, ajouterTypeMaterielController, getServicesController, getSourcesAchatController,
    getMaterielsController,ajouterSocieteController, ajouterServiceController
};