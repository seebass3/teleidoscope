/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '5faknvkn'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineCliConfig({
	api: {
		projectId,
		dataset,
	},
	studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '',
	autoUpdates: true,
})
