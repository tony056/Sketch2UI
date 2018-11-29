import { Storage } from 'aws-amplify';

async function s3Upload(content, taskName) {
  const filename = `${taskName}_${Date.now()}.jpg`;
  const stored = await Storage.vault.put(filename, content, {
    contentType: 'image/jpeg',
  });
  return stored.key;
}

export default s3Upload;
