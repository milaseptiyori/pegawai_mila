const express = require("express");

const pegawaiRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

pegawaiRoutes.route("/pegawai").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect.collection("pegawai")
  .find({})
  .toArray(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

pegawaiRoutes.route("/pegawai/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("pegawai").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

pegawaiRoutes.route("/pegawai/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  console.log(req.body)
  let myobj = {
    nama: req.body.nama,
    nip: req.body.nip,
    tanggal_absen: req.body.tanggal_absen,
    jam_hadir: req.body.jam_hadir,
    jam_pulang: req.body.jam_pulang,
    status: req.body.status,
    approve: req.body.approve,
  };
  db_connect.collection("pegawai").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

pegawaiRoutes.route("/pegawai/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    let newvalues = {
      $set: {
        nama: req.body.nama,
        nip: req.body.nip,
        tanggal_absen: req.body.tanggal_absen,
        jam_hadir: req.body.jam_hadir,
        jam_pulang: req.body.jam_pulang,
        status: req.body.status,
        approve: req.body.approve,
      },
    };
    db_connect
      .collection("pegawai")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 data pegawai updated");
        response.json(res);
      });
  });
  
  // This section will help you delete a pegawai
  pegawaiRoutes.route("/pegawai/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("pegawai").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 data pegawai deleted");
      response.json(obj);
    });
  });
  
  pegawaiRoutes.route("/pegawai/approve/:id").get(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        approve: req.body.approve,
      },
    };
    db_connect
      .collection("pegawai")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 data pegawai updated");
        response.json(res);
      });
  });
  
  module.exports = pegawaiRoutes;