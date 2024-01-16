const userModel = require('../models/userModels')
const societeModel = require('../models/societeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const serviceModel = require('../models/serviceModel')
const sourceAchatModel = require('../models/sourceachatModel')
const materielModel = require('../models/materielModel')
const typeMaterielModel = require('../models/typematerielModel')
const slugify = require('slugify')
const bonLivraisonModel = require('../models/bonLivraisonModel')
const mainCouranteModel = require('../models/maincouranteModel')
const BonCommandeModel = require('../models/bonCommandeModel')

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
// type materiel
const getTypeMaterielsController = async (req, res) => {
    try {
        const typeMateriels = await typeMaterielModel.find({}).sort({createdAt:-1}) 
        res.status(200).send({success:true, message:'type materiels data', typeMateriels})
     } catch (error) {
         console.log(error);
         res.status(500).send({success:false, message:'Error while fetching societes', error})
     }
}
const ajouterTypeMaterielController = async (req, res) => {
    try {
        const {nomTypeMateriel} = req.body
        if(!nomTypeMateriel) return res.status(401).send({message:'Nom de type est obligatoire'})
        const existingTypeMateriel = await typeMaterielModel.findOne({nomTypeMateriel})
        if(existingTypeMateriel) {
            return res.status(200).send({success:true, message:'Type Materiel Already Exist'})
        }
        const typeMateriel = await typeMaterielModel({nomTypeMateriel, slug:slugify(nomTypeMateriel)})
        await typeMateriel.save()
        res.status(201).send({success:true, message: "Type materiel added successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, error, message:"Error While Applying For Doctor"})
    }
}
// materiel
const getMaterielsController = async (req, res) => {
    try {
       const materiels = await materielModel.find({}).sort({createdAt:-1})
       res.status(200).send({success:true, message:' materiels data', materiels})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching materiels', error})
    }
}
const ajouterMaterielController = async (req, res) => {
        try {
            const { nomMateriel, typeMateriel } = req.body;
            switch (true) {
                case !nomMateriel:
                    return res.status(500).send({ error: 'Nom matériel is required' });
                case !typeMateriel:
                    return res.status(500).send({ error: 'Type matériel is required' });
            }
            const typeMaterielObj = await typeMaterielModel.findById(typeMateriel)
            const nomTypeMateriel = typeMaterielObj ? typeMaterielObj.nomTypeMateriel : null;
            const materiels = new materielModel({...req.body,slug: slugify(nomMateriel),nomTypeMateriel: nomTypeMateriel,});
            await materiels.save();
            res.status(201).send({ success: true, message: 'Materiel Created Successfully', materiels });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, error, message: 'Error in Creating Materiel' });
        }

}

// main courante
const getMainCourantesController = async (req, res) => {
    try {
       const mainCourantes = await mainCouranteModel.find({}).sort({createdAt:-1})
       res.status(200).send({success:true, message:' main courante data', mainCourantes})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching main courante', error})
    }
}
const ajouterMainCouranteController = async (req, res) => {
    try {
        const {materiel} = req.body;
        const materielObj = await materielModel.findById(materiel)
        const nomMateriel = materielObj ? materielObj.nomMateriel : null;
        const mainCourantes = new mainCouranteModel({...req.body, nomMateriel});
        await mainCourantes.save();
        res.status(201).send({ success: true, message: 'Materiel Created Successfully', mainCourantes});
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in Creating main courantes' });
    }

}



// bon livraison
const getBonLivraisonsController = async (req, res) => {
    try {
       const bonLivraisons = await bonLivraisonModel.find({}).sort({createdAt:-1})
       res.status(200).send({success:true, message:' bon livraison data', bonLivraisons})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching bon livraison', error})
    }
}
const ajouterBonLivraisonController = async (req, res) => {
    try {
        const { materiel, unite, quantite, dateEntree } = req.body;
        switch (true) {
            case !materiel:
                return res.status(500).send({ error: 'Article is required' });
            case !unite:
                return res.status(500).send({ error: 'Unité is required' });
            case !quantite:
                return res.status(500).send({err: 'Quantité is required'})
            case !dateEntree:
                return res.status(500).send({err: 'date entré is required'})
        }
        // const materielObj = await materielModel.findById(materiel)
        // const nomMateriel = materielObj ? materielObj.nomMateriel : null;
        const bonLivraisons = new bonLivraisonModel({...req.body});
        await bonLivraisons.save();
        res.status(201).send({ success: true, message: 'bon livraison Created Successfully', bonLivraisons });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in Creating Materiel' });
    }
}

// bon commande
const getBonCommandesController = async (req, res) => {
    try {
       const bonCommandes = await BonCommandeModel.find({}).sort({createdAt:-1})
       res.status(200).send({success:true, message:' bon commande data', bonCommandes})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching bon livraison', error})
    }
}
const ajouterBonCommandeController = async (req, res) => {
    try {
        const { materiel } = req.body;
        // const materielObj = await materielModel.findById(materiel)
        // const nomMateriel = materielObj ? materielObj.nomMateriel : null;
        const bonCommandes = new BonCommandeModel({...req.body});
        await bonCommandes.save();
        res.status(201).send({ success: true, message: 'bon commande Created Successfully', bonCommandes });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, error, message: 'Error in Creating Materiel' });
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

const getStockController = async (req, res) => {
    try {
        const quantites = await bonLivraisonModel.find()
        const qteLivrees = await BonCommandeModel.find()
        const stockParMateriel = {}
        quantites.forEach(quantite => {
            const {materiel, quantite: quantité} = quantite
            stockParMateriel[materiel] = (stockParMateriel[materiel] || 0) + quantité;
        })
        qteLivrees.forEach(qteLivree => {
            const {materiel, qteLivree: quantité} = qteLivree
            stockParMateriel[materiel] = (stockParMateriel[materiel] || 0) - quantité;
        })
        res.status(200).send({data:stockParMateriel})
    } catch (error) {
        console.log(error);
        res.status(500).send({success:false, message:'Error while fetching stock', error})
    }
}

module.exports = { loginController, registerController, authController, getSocietesController,
    getTypeMaterielsController, ajouterTypeMaterielController, getServicesController, getSourcesAchatController,
    getMaterielsController,ajouterSocieteController, ajouterServiceController, ajouterMaterielController, 
    ajouterBonLivraisonController, getMainCourantesController, getBonLivraisonsController,
    getBonCommandesController, ajouterBonCommandeController, ajouterMainCouranteController,
    getStockController,
};