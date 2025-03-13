# Contentformer

A Next.js application that helps you transform video transcripts into various content formats using AI. Generate content ideas, video scripts, and LinkedIn posts from your video transcripts with ease.

## Features

- **AI-Powered Content Generation**: Leverage Claude and GPT models to transform transcripts into creative content.
- **Multiple Output Formats**: Generate content ideas, video scripts, and LinkedIn posts.
- **Interactive UI**: User-friendly interface with real-time progress tracking.
- **Customizable Instructions**: Add specific instructions to guide the AI generation.
- **Provider Options**: Choose between Anthropic (Claude) and OpenAI (GPT) models.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contentformer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your API keys:
     ```
     ANTHROPIC_API_KEY=your_anthropic_api_key_here
     OPENAI_API_KEY=your_openai_api_key_here
     PREFERRED_PROVIDER=anthropic
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000` in your browser

## Production Deployment

When deploying to production (e.g., Railway, Vercel, etc.):

1. Set the following environment variables in your hosting platform:
   - `ANTHROPIC_API_KEY`
   - `OPENAI_API_KEY`
   - `PREFERRED_PROVIDER` (optional, defaults to "anthropic")
   - `NEXT_PUBLIC_SITE_URL` (the URL of your deployed application)

2. Build and deploy the application:
   ```bash
   npm run build
   npm start
   ```

### Troubleshooting Production Issues

If you encounter API errors in production:

1. Verify that environment variables are properly set in your hosting platform
2. Check that the API keys are valid and have the correct permissions
3. Ensure the `ANTHROPIC_API_KEY` starts with "sk-ant" and the `OPENAI_API_KEY` starts with "sk-"
4. Check application logs for specific error messages

## Configuration

The application supports multiple ways to configure API keys:

1. **Environment Variables**: Set `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` in your environment
2. **UI Settings**: Click the settings (cog) icon to open the API configuration dialog
3. **HTTP-only Cookies**: For secure storage (automatically used with the UI settings)

API keys are stored securely with the following priority:
1. Environment variables (highest priority)
2. HTTP-only cookies
3. Browser localStorage (lowest priority)

## Usage

1. Enter your transcript in the main text area.
2. (Optional) Add specific instructions to guide the AI.
3. Click "Generate Content."
4. The system will process your content in three stages:
   - Generate content ideas.
   - Create video scripts for selected ideas.
   - Produce LinkedIn posts based on scripts.
5. Browse through the generated content using the tabs.
6. Pause/resume the generation process if needed.

## Technologies

- **Framework**: Next.js, React
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **AI Integration**: AI SDKs for Anthropic and OpenAI
- **Utilities**: clsx, date-fns, uuid, zod

## License

MIT