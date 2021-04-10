import express from 'express';
import {DatabaseUtils} from "../database";
import {ZooControllers} from "../controllers";

const router = express.Router();


router.get("/:nom", async function(req,res) {
    const connection = await DatabaseUtils.getConnection()
    const zooControllers = new ZooControllers(connection);
    const zoo = await zooControllers.getByNom(req.params.nom);
    if(zoo === null){
        res.status(404).end()
    }else{
        res.json(zoo)
    }
})

router.delete("/:nom", async function(req,res) {
    const connection = await DatabaseUtils.getConnection()
    const zooController = new ZooControllers(connection);
    const sucess = await zooController.removeById(req.params.id)
    if(sucess){
        res.status(204).end()
    }else{
        res.status(404).end()
    }
})
router.put("/", async function(req,res) {
    const nom =  req.body.nom
    const description =  req.body.description
    const images =  req.body.images
    const type =  req.body.type
    const capacité =  req.body.capacité
    const durée =  req.body.durée
    const horaires =  req.body.horaires
    const accès_handicapé =  req.body.accès_handicapé
    if(nom===undefined){
        res.status(400).end()
        return
    }
    const connection = await DatabaseUtils.getConnection()
    const zooControllers = new ZooControllers(connection);
    const zoo = await zooControllers.update({
       nom,
       description,
       images,
       type,
       capacity: capacité,
       durée:Number.parseInt(durée),
       horaires:Number.parseInt(horaires),
       accès_handicapé

    });
    if(zoo === null){
        res.status(404)
    }else{
        res.json(zoo)
    }
})
router.post("/", async function(req,res) {
    const nom =  req.body.nom
    const description =  req.body.description
    const images =  req.body.images
    const type =  req.body.type
    const capacité =  req.body.capacité
    const durée =  req.body.durée
    const horaires =  req.body.horaires
    const accès_handicapé =  req.body.accès_handicapé

    const connection = await DatabaseUtils.getConnection()
    const zooControllers = new ZooControllers(connection);
    const zoo = await zooControllers.create({
        nom,
        description,
        images,
        type,
        capacity: capacité,
        durée:Number.parseInt(durée),
        horaires:Number.parseInt(horaires),
        accès_handicapé
    });
    if(zoo===null){
        res.status(500).end()
    }else{
        res.status(201)
        res.json(zoo)
    }
})
export default router;