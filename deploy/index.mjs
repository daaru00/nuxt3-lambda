import fs from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'
const s3 = new S3Client()
const cloudfront = new CloudFrontClient()

const DISTRIBUTION_ID = process.env.DISTRIBUTION_ID
const S3_BUCKET = process.env.S3_BUCKET

function getContentType (ext) {
  switch (ext) {
    case '.txt': return 'text/plain'
    case '.html': return 'text/html'
    case '.css': return 'text/css'
    case '.js': return 'application/javascript'
    case '.png': return 'image/png'
    case '.jpg': return 'image/jpeg'
    case '.jpeg': return 'image/jpeg'
    case '.gif': return 'image/gif'
    case '.svg': return 'image/svg+xml'
    case '.ico': return 'image/x-icon'
    case '.json': return 'application/json'
    default: return 'application/octet-stream'
  }
}

async function uploadDirectory(rootPath, dir = '') {
  console.log('Scanning ' + path.join(rootPath, dir) + '..')
  const res = fs.readdirSync(path.join(rootPath, dir))
  for (const entry of res) {
    const relativePath = path.join(dir, entry)
    const fullPath = path.join(rootPath, relativePath)
    if (fs.lstatSync(fullPath).isDirectory()) {
      await uploadDirectory(rootPath, relativePath);
    } else {
      console.log('Uploading ' + fullPath + '..')
      await s3.send(new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: relativePath,
        Body: Buffer.from(fs.readFileSync(fullPath)),
        ContentType: getContentType(path.extname(fullPath))
      }))
    }
  }
}

async function invalidate() {
  console.log('Invalidating distribution '+DISTRIBUTION_ID+'..')
  await cloudfront.send(new CreateInvalidationCommand({
    DistributionId: DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: new Date().getTime().toString(),
      Paths: {
        Quantity: 1,
        Items: ['/*']
      }
    }
  }))
}

export async function handler() {
  await uploadDirectory('/opt/')
  await invalidate()
}
