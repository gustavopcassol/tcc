import React from 'react';
import DropzoneArea from '../components/DropzoneArea';
import CodeAnalysis from '../CodeAnalysis';
import {useHistory} from 'react-router-dom';
import {Path} from './Path';

export default function CodeFilesUpload() {
  const history = useHistory();

  async function handleDrop(files: File[]) {
    history.push(Path.CODE_ANALYSIS_RESULT);
    const codeAnalysis = new CodeAnalysis();
    await codeAnalysis.run(files);
  }

  return (
    <div className="code-files-upload">
      <DropzoneArea onDrop={handleDrop} acceptedFiles={['.java']} />
    </div>
  );
}