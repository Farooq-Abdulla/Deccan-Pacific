const dotenv = require("dotenv");
dotenv.config();
const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const QueryRanker = async (problem) => {
  const chatModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.5,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are going to rank a query given by the user on a scale of 1 to 10 based on the seriousness of the query. The queries are mostly  regarding on their housing needs, community amenities, policies, and maintenance requests. Your output is going to be a Number, thats it. Rank Accordingly. Give a high number only if it is urgent and important",
    ],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel);
  const response = await chain.invoke({
    input: problem,
  });
  return response?.content;
};
module.exports = QueryRanker;

// async function main() {
//   const ans = await QueryRanker("We are not getting water in our room");
//   console.log(ans);
// }

// main();
