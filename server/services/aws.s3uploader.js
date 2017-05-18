const ReactS3Uploader = require('react-s3-uploader');
const express = require('express');
const router = express.Router();

const S3_BUCKET = process.env.S3_BUCKET;

router.use('/s3', require('react-s3-uploader/s3router')({
  bucket: S3_BUCKET,
  region: 'us-west-1', // optional
  headers: { 'Access-Control-Allow-Origin': '*' }, // optional
  ACL: 'public-read', // this is default
}));

module.exports = router;
