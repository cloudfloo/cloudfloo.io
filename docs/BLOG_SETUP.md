# Blog System Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## MCP Configuration

Update `.cursor/mcp.json` to replace `SUPABASE_ACCESS_TOKEN_HERE` with your actual Supabase personal access token.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Supabase database schema (see Database Setup section)

3. Start development server:
   ```bash
   npm run dev
   ```

## Database Setup

The blog system requires the following Supabase tables and functions. Use the Supabase MCP server to execute these:

### Tables
- `blog_posts`
- `blog_categories` 
- `blog_tags`
- `blog_post_tags`
- `blog_authors`
- `blog_post_translations`

See the SQL schema files in the `database/` directory for complete setup. 