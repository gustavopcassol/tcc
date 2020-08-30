package test.com;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.pmd.PmdAnalysisResult;
import com.pmd.PmdRunner;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

interface PmdTest {

  @Test
  default void testCompleteExecutionTemplateMethod() throws IOException {
    String code = getInputCode();
    Path codeFile = createTemporaryFileWithCode(code);
    PmdAnalysisResult pmdAnalysisResult = runPmdAndDeleteFile(codeFile);
    removeDataThatVaries(pmdAnalysisResult);
    String expectedResult = getExpectedResult();
    Assertions.assertEquals(expectedResult, pmdAnalysisResult.toString());
  }

  String getInputCode();

  private Path createTemporaryFileWithCode(String code) throws IOException {
    Path codeFile = Files.createTempFile("test-code", "");
    try {
      writeTextToFile(code, codeFile);
    } catch (Exception e) {
      Files.delete(codeFile);
      throw e;
    }
    return codeFile;
  }

  private void writeTextToFile(String text, Path file) throws IOException {
    try (BufferedWriter bufferedWriter = Files.newBufferedWriter(file)) {
      bufferedWriter.write(text);
    }
  }

  private PmdAnalysisResult runPmdAndDeleteFile(Path codeFile) throws IOException {
    try {
      return runPmd(codeFile);
    } finally {
      Files.delete(codeFile);
    }
  }

  private PmdAnalysisResult runPmd(Path file) throws IOException {
    PmdRunner pmdRunner = new PmdRunner(file);
    return pmdRunner.run();
  }

  private void removeDataThatVaries(PmdAnalysisResult pmdAnalysisResult) {
    removeTimestamp(pmdAnalysisResult);
    removeFilenames(pmdAnalysisResult);
  }

  private void removeTimestamp(PmdAnalysisResult pmdAnalysisResult) {
    pmdAnalysisResult.addProperty("timestamp", "");
  }

  private void removeFilenames(PmdAnalysisResult pmdAnalysisResult) {
    JsonArray files = pmdAnalysisResult.getAsJsonArray("files");
    for (JsonElement file : files) {
      JsonObject fileAsJsonObject = file.getAsJsonObject();
      fileAsJsonObject.addProperty("filename", "");
    }
  }

  String getExpectedResult();

}
