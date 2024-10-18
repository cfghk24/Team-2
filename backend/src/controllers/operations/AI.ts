require("dotenv").config();
const { VertexAI } = require("@google-cloud/vertexai");
// Initialize Vertex with your Cloud project and location
process.env.GOOGLE_APPLICATION_CREDENTIALS;

const vertex_ai = new VertexAI({
  project: process.env.PROJECTID,
  location: "asia-east2",
  keyFilename: process.env.KEYPATHFILE,
});
const model = "gemini-1.5-flash-001";
const instrutionsBonds = [
  {
    text: `
    `,
  },
];
const instrutionsBroker = [
  {
    text: `You are a keyword extraction expert. When given a paragraph about a pet owner's experience, your task is to:
  
  1. Identify the most relevant and important keywords or key phrases from the text.
  2. Focus on words that capture the essence of the pet ownership experience, emotions, activities, and challenges mentioned.
  3. Include both general terms related to pet ownership and specific details from the given paragraph.
  4. Aim to provide between 5 to 10 keywords or short key phrases.
  5. Return ONLY an array of these keywords, with each keyword or key phrase as a separate string element in the array.
  
  Example format of your response:
  ["keyword1", "keyword2", "key phrase 1", "keyword3", "key phrase 2"]
  
  Do not include any explanations or additional text in your response, just the array of keywords.`,
  },
];
// Instantiate the models
const generativeModelBroker = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
  systemInstruction: {
    parts: [instrutionsBroker],
  },
});

const generativeModelBond = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ],
  systemInstruction: {},
});

export async function generateKeyWords(text: string): Promise<string[]> {
  const req = {
    contents: [{ role: "user", parts: [{ text: text }] }],
  };

  try {
    const streamingResp = await generativeModelBroker.generateContentStream(req);
    let response: any = await streamingResp.response;

    // Extract the text from the response
    let responseText = response.candidates[0].content.parts[0].text;

    // Remove any markdown formatting if present
    responseText = responseText.replace(/```json\n|\n```/g, "").trim();

    // Parse the response text as JSON
    let keywords: string[];
    try {
      keywords = JSON.parse(responseText);
      if (!Array.isArray(keywords)) {
        throw new Error("Response is not an array");
      }
    } catch (error) {
      // If parsing fails, split the text by commas or newlines
      keywords = responseText.split(/[,\n]+/).map((keyword: string) => keyword.trim().replace(/^["']|["']$/g, ""));
    }

    // Filter out any empty strings
    keywords = keywords.filter((keyword) => keyword.length > 0);

    return keywords;
  } catch (error) {
    console.error("Error generating keywords:", error);
    return [];
  }
}
export async function generateContentBond(type: string, data: any) {
  const req = {
    contents: [
      {
        role: "user",
        parts: [
          { text: instrutionsBonds[0].text },
          {
            inlineData: {
              mimeType: `${type}`,
              data: data,
            },
          },
        ],
      },
    ],
  };

  const streamingResp = await generativeModelBond.generateContentStream(req);

  let response: any = await streamingResp.response;
  return JSON.parse(JSON.parse(JSON.stringify(response.candidates[0].content.parts[0].text)).replace(/`/g, "").replace("json", ""));
  //   return response;
}
