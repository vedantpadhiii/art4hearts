import template from '../server/knowledge/system_prompt.md';
import knowledge from '../server/knowledge/public.md';
import { createWorker } from './handler.mjs';

export default createWorker({ prompt: template.replace('{KNOWLEDGE_PACK}', knowledge) });
