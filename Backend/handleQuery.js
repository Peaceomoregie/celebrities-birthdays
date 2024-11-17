import weaviate from 'weaviate-client';
import dotenv from 'dotenv';

dotenv.config();
// To build a flexible search engine where users can query various types of information like birthdays, zodiac signs, or occupations, you need to:
// Adapt the query based on the parsed user intent.
const wcdUrl = process.env.WEAVIATE_URL;
const wcdApiKey = process.env.WEAVIATE_API_KEY;
const openAiApiKey = process.env.OPENAI_APIKEY;
const queryMap = {
  "born": "birthday",
  "birthday": "birthday",
  "sign": "birth_sign",
  "zodiac": "birth_sign",
  "occupation": "occupation",
  "job": "occupation",
};

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
    const userInput = "Which actors are Capricorn?";
    // Parse user input
    const tokens = userInput.toLowerCase().split(" ");
    let searchProps = [];
    for (let token of tokens) {
      if (queryMap[token]) {
        searchProps.push(queryMap[token]);
      }
    }
    // Default to `name` if no specific property is matched
    if (searchProps.length === 0) {
      searchProps = ["name"];
    }
    const celebrity = client.collections.get('Celebrity');
    const response = await celebrity.generate.nearText(userInput, {
      singlePrompt: `Find celebrities with ${searchProps.join(", ")} like {${searchProps.join("}, {")}}.`},
      { limit: 2 }
    )
    // Print results
    if (response.objects && response.objects.length > 0) {
      for (let obj of response.objects) {
        console.log("Generated:", obj.generated);
      }
    } else {
      console.log("No results found for your query.");
    }
    client.close();
  } catch (error) {
    console.error("Error querying Weaviate:", error);
  }
})();
