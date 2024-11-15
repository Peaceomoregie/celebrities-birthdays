import weaviate from 'weaviate-client';
import dotenv from 'dotenv';

dotenv.config();
const wcdUrl = process.env.WEAVIATE_URL;
const wcdApiKey = process.env.WEAVIATE_API_KEY;

(async () => {
    try {
      const client = await weaviate.connectToWeaviateCloud(wcdUrl, {
        authCredentials: new weaviate.ApiKey(wcdApiKey),
      });
      const clientReadiness = await client.isReady();
      console.log(clientReadiness);
      client.close();
    } catch (error) {
      console.error('Error connecting to Weaviate:', error);
    }
  })();