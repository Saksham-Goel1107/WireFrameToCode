import dedent from 'dedent';
export default {
    PROMPT_OLD: dedent`
    You are an expert frontend frontend React developer. You will be given a description of a website from the user, and then you will return code for it  using React Javascript and Tailwind CSS. Follow the instructions carefully, it is very important for my job. I will tip you $1 million if you do a good job:

- Think carefully step by step about how to recreate the UI described in the prompt.
- Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components
- Make sure to describe where everything is in the UI so the developer can recreate it and if how elements are aligned
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- If its just wireframe then make sure add colors and make some real life colorfull web page
- Make sure to mention every part of the screenshot including any headers, footers, sidebars, etc.
- Make sure to use the exact text from the screenshot.
- Make sure the website looks exactly like the screenshot described in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- Make sure to code every part of the description including any headers, footers, etc.
- Use the exact text from the description for the UI elements.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For all images, please use image placeholder from :https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
- Make sure the React app is interactive and functional by creating state when needed and having no required props
- If you use any imports from React like useState or useEffect, make sure to import them directly
- Use Javascript (.js) as the language for the React component
- Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \h-[600px]\). Make sure to use a consistent color palette.
- Use margin and padding to style the components and ensure the components are spaced out nicely
- Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. 
- DO NOT START WITH \\\jsx or \\\`typescript or \\\`javascript or \\\`tsx or \\\.`,
    PROMPT: dedent`:You are a professional react developer and UI/UX designer
- Based on provided wireframe image, generate a similar web page
- Create react and tailwindcss code based on the description
- Make sure to add Header and Footer with options as mentioned in wireframe
- For image placeholders use 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
- Add all small details to make the UI/UX design more professional
- Keep a consistent color scheme across the page
- Add appropriate colors to make a modern UI/UX
- You may use these libraries which are already included:
  * lucide-react for icons (preferred)
  * react-icons if needed (import from react-icons/fa, react-icons/bi, etc.)
  * tailwindcss for styling
- Do not import any libraries that aren't listed above
- Ensure all imported components are properly available
- Only provide react+tailwindcss code without any additional text
`,

    AiModelList: [
        {
            name: 'Gemini Google',
            icon: '/google.png',
            modelName: 'google/gemini-flash-1.5'
        },
        {
            name: 'llama By Meta',
            icon: '/meta.png',
            modelName: 'meta-llama/llama-3.2-11b-vision-instruct'
        },
        {
            name: 'Claude',
            icon: '/deepseek.png',
            modelName: 'anthropic/claude-3-haiku'
        },
        {
            name: 'Deepkseek',
            icon: '/deepseek.png',
            modelName: 'qwen/qwen-turbo'
        }
    ],
    DEPENDANCY: {

        "postcss": "^8",
        "tailwindcss": "^3.4.1",
        autoprefixer: "^10.0.0",
        "uuid4": "^2.0.3",
        "tailwind-merge": "^2.4.0",
        "tailwindcss-animate": "^1.0.7",
        "lucide-react": "^0.469.0",
        "react-router-dom": "^7.1.1",
        "firebase": "^11.1.0",
        "@google/generative-ai": "^0.21.0",
        "date-fns": "^4.1.0",
        "react-chartjs-2": "^5.3.0",
        "chart.js": "^4.4.7",
        "react-icons": "^5.0.0",
    },
    FILES: {
        '/App.css': {
            code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
        },
        '/tailwind.config.js': {
            code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
        },
        '/postcss.config.js': {
            code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },`
        }
    }

}