import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatContentToHtml(content: string): string {
    if (!content) return "";

    let processed = content;

    // Check if the content is mostly raw markdown text (doesn't contain <p> tags)
    const isRawMarkdown = !content.includes("<p>") && !content.includes("<div");

    if (isRawMarkdown) {
        // If it is raw markdown, replace headers first
        processed = processed.replace(/^##\s*(.*?)$/gm, '<h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-8 mb-4 border-b pb-2 border-gray-100">$1</h2>');
        processed = processed.replace(/^###\s*(.*?)$/gm, '<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');
        processed = processed.replace(/^#\s*(.*?)$/gm, '<h1 class="text-3xl sm:text-4xl font-black text-gray-900 mt-8 mb-4">$1</h1>');

        // Replace bold **text**
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-950">$1</strong>');

        // Parse lists and paragraphs line by line
        const lines = processed.split('\n');
        let inList = false;
        const parsedLines = lines.map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const itemContent = trimmed.substring(2);
                let prefix = '';
                if (!inList) {
                    inList = true;
                    prefix = '<ul class="list-disc pl-6 mb-6 space-y-2">';
                }
                return `${prefix}<li class="text-gray-750 leading-relaxed">${itemContent}</li>`;
            } else {
                let suffix = '';
                if (inList) {
                    inList = false;
                    suffix = '</ul>';
                }
                if (trimmed === '') {
                    return suffix;
                }
                if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</ul')) {
                    return suffix + line;
                }
                return `${suffix}<p class="mb-5 text-gray-750 leading-7 text-base sm:text-[17px]">${line}</p>`;
            }
        });

        if (inList) {
            parsedLines.push('</ul>');
        }

        processed = parsedLines.join('\n');
    } else {
        // If it is already HTML, format raw markdown structures inside it
        processed = processed.replace(/(?:<p>|<br\s*\/?>)?\s*##\s*([^<\n\r]+)(?:<\/p>|<br\s*\/?>)?/g, '<h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-8 mb-4 border-b pb-2 border-gray-100">$1</h2>');
        processed = processed.replace(/(?:<p>|<br\s*\/?>)?\s*###\s*([^<\n\r]+)(?:<\/p>|<br\s*\/?>)?/g, '<h3 class="text-xl sm:text-2xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');
        processed = processed.replace(/(?:<p>|<br\s*\/?>)?\s*#\s*([^<\n\r]+)(?:<\/p>|<br\s*\/?>)?/g, '<h1 class="text-3xl sm:text-4xl font-black text-gray-900 mt-8 mb-4">$1</h1>');
        
        // Replace markdown bold text inside HTML
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-955">$1</strong>');

        // Replace markdown list items like "- High‑resolution..."
        processed = processed.replace(/(?:^|\n|<p>|<br\s*\/?>)\s*-\s+([^<\n\r]+)(?:<\/p>|<br\s*\/?>)?/g, '\n<li class="text-gray-755 leading-relaxed list-disc ml-6 mb-2">$1</li>');
        
        // Cleanup empty paragraph tags
        processed = processed.replace(/<p>\s*<\/p>/g, '');
    }

    return processed;
}
