import fs from 'fs';
import path from 'path';


export async function fileUpload(file, namePath) {
  try {
    let matches = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let response = {};

    if (matches.length !== 3) {
      return new Error('invalid input string');
    }

    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');

    let imageBuffer = response.data;
    let extension = response.type.split('/');
    let filename = `${Date.now()}.${extension[1]}`;
    let fileRoute = `/${namePath}/${filename}`;
    
    fs.writeFileSync(
      `${path.dirname(require.main.filename)}/server/public/images${fileRoute}`,
      imageBuffer,
      'utf8'
    );
    
    return fileRoute;
  } catch (error) {
    return new Error('Internal server error');
  }

}