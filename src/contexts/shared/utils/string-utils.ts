export function getURLPattern(url: string): string {
  const urlSplited = url.split('?');
  let pattern = urlSplited[0].replace(/\/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\/?/g, '/:id/');
  pattern = pattern.replace(/\/$/g, '');
  return pattern.split('/origen')[1];
}

export function getURI(url: string): string {
  const urlSplited = url.split('?');
  return urlSplited[0].split('/origen')[1];
}
