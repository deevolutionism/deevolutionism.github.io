import fs from 'fs';
import path from 'path';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { rehype } from 'rehype';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight'
import html from 'remark-html';
import glob from 'glob'

const postsDirectory = path.join(process.cwd(), 'pages/posts');

export function getSortedPostsData() {
  // Get file names under /posts
  // const fileNames = 
  const fileNames = glob.sync(`*.md`, {cwd: postsDirectory})
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const tags = matterResult.data.tags.split(', ')

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
      tags
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeStringify, {allowDangerousHtml: true})
  .process(matterResult.content)

  const styledContent = await rehype()
    .data('settings', {fragment: true})
    .use(rehypeHighlight)
    .process(processedContent)

  const contentHtml = String(styledContent)
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}