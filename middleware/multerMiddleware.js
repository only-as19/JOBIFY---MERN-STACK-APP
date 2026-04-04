import multer from 'multer';
import DataParser from 'datauri/parser.js'
import path from 'path'


const storage = multer.memoryStorage();

const upload = multer({ storage });
const Parser = new DataParser()

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString()

  return Parser.format(fileExtension, file.buffer).content
}

export default upload;
