import weaviate from 'weaviate-client';
import { generateUuid5 } from "weaviate-client";
import { readFileSync } from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const wcdUrl = process.env.WEAVIATE_URL;
const wcdApiKey = process.env.WEAVIATE_API_KEY;
const openAiApiKey = process.env.OPENAI_APIKEY;
const data = JSON.parse(readFileSync('./celebrity-data.json', 'utf-8'));

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
      const celebrity = client.collections.get("Celebrity")
      for (const celebrityInfo of data) {
        await celebrity.data.insert({
          'name': celebrityInfo['name'],
          'birthday': celebrityInfo['birthday'],
          'birth_year': celebrityInfo['birth_year'],
          'birth_place': celebrityInfo['birth_place'],
          'birth_sign': celebrityInfo['birth_sign'],
          'occupation': celebrityInfo['occupation'],
          'photo': celebrityInfo['photo_url'],
        })

      }
      console.log("Done Importing")
      
      const response = await jeopardy.query.fetchObjects();
      if (response.objects && response.objects.length > 0) {
        for (const obj of response.objects) {
          console.log("UUID:", obj.uuid); // Print the UUID
          console.log("Properties:", obj.properties); // Print the properties
          console.log("---------------------------");
        }
      } else {
        console.log("No objects found in the Celebrity collection.");
      }
      client.close();
    } catch (error) {
      console.error('Something went wrong in import!:', error);
    }
  })();
