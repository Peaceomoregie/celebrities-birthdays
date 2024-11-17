import weaviate from 'weaviate-client';
import { configure, vectorizer, dataType } from "weaviate-client";
import dotenv from 'dotenv';

dotenv.config();
const wcdUrl = process.env.WEAVIATE_URL;
const wcdApiKey = process.env.WEAVIATE_API_KEY;
const openAiApiKey = process.env.OPENAI_APIKEY;

(async () => {
    try {
      const client = await weaviate.connectToWeaviateCloud(
        wcdUrl,
        {
          authCredentials: new weaviate.ApiKey(wcdApiKey),
          headers: {
            'X-OpenAI-Api-Key': openAiApiKey   // Replace with your inference API key
          }
        }
      );
      await client.collections.delete('Celebrity')
      await client.collections.create({
        name: "Celebrity", // Name of the collection
        properties: [
          { name: "name", dataType: dataType.TEXT }, // Celebrity's name
          { name: "birthday", dataType: dataType.TEXT }, // Birthday in ISO-8601 format
          { name: "birth_year", dataType: dataType.INT }, // Year of birth
          { name: "birth_place", dataType: dataType.TEXT }, // Place of birth
          { name: "birth_sign", dataType: dataType.TEXT }, // Zodiac or astrological sign
          { name: "occupation", dataType: dataType.TEXT }, // Occupation
          { name: "photo", dataType: dataType.TEXT }, // URL or path to the photo
        ],
        // Define the vectorizer module
        vectorizers: vectorizer.text2VecOpenAI(),
        // Define the generative module
        generative: configure.generative.openAI(),
      });
      console.log("Collection created")
      client.close();
    } catch (error) {
      console.error('Error connecting to Weaviate:', error);
    }
  })();