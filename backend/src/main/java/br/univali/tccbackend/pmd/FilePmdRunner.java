package br.univali.tccbackend.pmd;

import br.univali.tccbackend.CodeAnalysisParser;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FilePmdRunner implements PmdRunner {

  private final String fileOrDirectoryToAnalyze;

  private FilePmdRunner(String fileOrDirectoryToAnalyze) {
    this.fileOrDirectoryToAnalyze = fileOrDirectoryToAnalyze;
  }

  public FilePmdRunner(Path fileOrDirectoryToAnalyze) {
    this(fileOrDirectoryToAnalyze.toString());
  }

  public PmdAnalysisResult run() throws IOException {
    // m todo trocar essa parte por decorator pattern ou AOP (olhar anotação)
    Path pmdResultFile = Files.createTempFile("pmd-report", "");
    try {
      return runPmd(pmdResultFile);
    } finally {
      Files.delete(pmdResultFile);
    }
  }

  private PmdAnalysisResult runPmd(Path fileToWriteTheResultInto) throws IOException {
    getPmdResult(fileToWriteTheResultInto);
    return convertPmdResult(fileToWriteTheResultInto);
  }

  private void getPmdResult(Path fileToWriteTheResultInto) {
    Pmd pmd = new Pmd();
    pmd.configure(this.fileOrDirectoryToAnalyze, fileToWriteTheResultInto.toString());
    pmd.analyze();
  }

  private PmdAnalysisResult convertPmdResult(Path pmdResultFile) throws IOException {
    JsonObject pmdAnalysisResult;
    try (BufferedReader bufferedReader = Files.newBufferedReader(pmdResultFile)) {
      pmdAnalysisResult = CodeAnalysisParser.parseJson(bufferedReader);
    }
    return new PmdAnalysisResult(pmdAnalysisResult);
  }

}
