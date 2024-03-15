import { openai } from "../openAi";

export async function generateWebsite(websiteName: string, websiteDescription: string, targetAudience: string) {
        // Construct the prompt with string interpolation
        const prompt = `
        Build responsive website using valid HTML and css,
        the css have to be in the style tag in the html
        using colors for styleing
        The goal is to create an informative platform introducing ${websiteName}
          (${websiteDescription}) to the ${targetAudience}.
    
      1. Hero Section:
         - Display a ${websiteName} that stands out by applying a colored font.
         - Provide a short description from ${websiteDescription} that introduces the website or its main purpose.
    
      2. Introduction:
         - Provide an engaging introduction to the ${websiteDescription}, catering to the interests and knowledge level of the specified ${targetAudience}.
         - Emphasize the significance and relevance of the ${websiteDescription} to the ${targetAudience}.
         - Incorporate the user-provided ${websiteDescription} to introduce the website's purpose and goals.
    
      3. Key Points:
         - Present key insights or essential information related to the website's ${websiteDescription}.
         - Organize these key points in a visually appealing format, considering user preferences.
         - Use appropriate design elements (e.g., cards, sections) to enhance readability and engagement.
    
      4. Frequently Asked Questions (FAQ):
         - Include a section addressing common queries and concerns related to the website's ${websiteDescription}.
         - Provide concise, informative answers tailored to the needs and interests of the specified ${targetAudience}.
    
      Ensure that the generated website template is responsive and adaptable to various screen sizes and devices to optimize the user experience. Utilize the provided user data, including the ${websiteName}, ${websiteDescription}, and ${targetAudience}, to personalize the content and design of the website accordingly.
        `;
    
        // Request content generation from OpenAI
        const response = await openai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL, // You can use the model of your choice
            messages: [{
                role: "user",
                content: prompt
            }],
            temperature: 0.7 // Adjust temperature for creativity
        });
    
        // Extract and return generated content
        console.log({first:response.choices })
        return response.choices[0].message.content;
    }
    

    /** const prompt = `
        Build responsive website using valid HTML and css,
        the css have to be in the style tag in the html
        the styling of the website have to be diffrent for each response
        The goal is to create an informative platform introducing ${websiteName}
          (${websiteDescription}) to the ${targetAudience}.
    
      1. Hero Section:
         - Highlight ${websiteName} prominently.
         - Craft a compelling description that reflects the essence of the website, incorporating the user-provided ${websiteDescription}.
    
      2. Introduction:
         - Provide an engaging introduction to the ${websiteDescription}, catering to the interests and knowledge level of the specified ${targetAudience}.
         - Emphasize the significance and relevance of the ${websiteDescription} to the ${targetAudience}.
         - Incorporate the user-provided ${websiteDescription} to introduce the website's purpose and goals.
    
      3. Key Points:
         - Present key insights or essential information related to the website's ${websiteDescription}.
         - Organize these key points in a visually appealing format, considering user preferences.
         - Use appropriate design elements (e.g., cards, sections) to enhance readability and engagement.
    
      4. Frequently Asked Questions (FAQ):
         - Include a section addressing common queries and concerns related to the website's ${websiteDescription}.
         - Provide concise, informative answers tailored to the needs and interests of the specified ${targetAudience}.
    
      Ensure that the generated website template is responsive and adaptable to various screen sizes and devices to optimize the user experience. Utilize the provided user data, including the ${websiteName}, ${websiteDescription}, and ${targetAudience}, to personalize the content and design of the website accordingly.
        `; */