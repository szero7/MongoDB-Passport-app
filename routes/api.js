const express = require("express");
const router = express.Router();
const homeController = require("./homeController");
const userController = require("./userController");


//PRODUCT

router.get("/index", homeController.getIndex); //Page d'accueil. Affiche toutes les données entrées. Revient sur cette page à chaque ajout ou modification de la base de données

router.get("/product/new", homeController.addProduct); //affiche le formulaire d'ajout
router.post("/product/new", homeController.saveAndRedirect); //valide les champs entrés dans le formulaire, sauve le produit et retourne vers l'index

router.get("/edit/:id", homeController.edit); //affiche le formulaire de modification
router.put("/edit/:id", homeController.updateAndRedirect); //valide les champs entrés dans le formulaire, prend les changements et retourne vers l'index

router.delete("/delete/:id", homeController.delete); //supprime le produit

router.get("/search", homeController.searchForm); //affiche la page de recherche la page de recherche
router.get("/giveResult", homeController.giveResult); //permet la recherche de produit par son code

//USER

router.get("/", userController.login); //page d'accueil. affiche la page de connexion
router.get("/user/register", userController.register); //affiche la page d'enregistrement d'utilisateur
router.post("/user/register", userController.saveUser, userController.login); //enregistre l'utilisateur et renvoie vers la page de connexion
// router.get("/user/login", userController.login);
router.post("/user/login", userController.authenticate1); //identifie l'utilisateur à la connexion et renvoie à la page index de la base de données produits
router.get("/logout", userController.logout); //Deconnecte l'utilisateur



module.exports = router;