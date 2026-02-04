
export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
}

const BASE_URL = 'https://api.github.com';

export async function checkRepoAccess(config: GitHubConfig): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/repos/${config.owner}/${config.repo}`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

export async function uploadFile(
  config: GitHubConfig,
  path: string,
  contentBase64: string,
  message: string
) {
  const url = `${BASE_URL}/repos/${config.owner}/${config.repo}/contents/${path}`;
  
  // First check if file exists to get SHA (for updates, though we usually upload new files)
  // For new files, we don't need SHA.
  
  const body = {
    message,
    content: contentBase64,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to upload file');
  }
  return res.json();
}

export async function getFileContent(config: GitHubConfig, path: string) {
  const url = `${BASE_URL}/repos/${config.owner}/${config.repo}/contents/${path}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch file content');
  }

  const data = await res.json();
  // content is base64 encoded
  const content = atob(data.content.replace(/\n/g, ''));
  return { content, sha: data.sha };
}

export async function updateFile(
  config: GitHubConfig,
  path: string,
  content: string,
  sha: string,
  message: string
) {
  const url = `${BASE_URL}/repos/${config.owner}/${config.repo}/contents/${path}`;
  const body = {
    message,
    content: btoa(content),
    sha,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to update file');
  }
  return res.json();
}
