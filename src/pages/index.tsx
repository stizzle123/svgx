import { Grid } from "@mui/material";
import { useMemo } from "react";
import {
  ClipboardCopy,
  FileUpload,
  Layout,
  Toast,
  Editor,
  SkeletonLoader,
  Failed,
  Notice,
} from "../components";
import { useEditor } from "../hooks";
import { useAppSelector } from "../state/hooks";
import { parseCode } from "../utils";

const Index = () => {
  const {
    code,
    setCode,
    output,
    toast,
    clipboardText,
    handleCopy,
    handleClose,
    isFailed,
  } = useEditor();
  const { framework, isSingleQuote, loading } = useAppSelector(
    (state) => state.app
  );
  const prettyOutput = useMemo(
    () => parseCode(output)({ singleQuote: isSingleQuote! }),
    [output, isSingleQuote]
  );

  return (
    <Layout>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          overflowX: "hidden",
        }}
        data-testid="index"
      >
        <Grid item md={6} sx={{ position: "relative", width: "100%" }}>
          <>
            {loading ? (
              <SkeletonLoader />
            ) : (
              !code && <FileUpload setCode={setCode} />
            )}

            <Editor
              mode="tsx"
              code={code}
              name="svg-editor"
              onChange={(value) => {
                setCode(value);
              }}
              onPaste={(value) => {
                setCode(value);
              }}
              placeholder="Paste your SVG code here"
            />
          </>
        </Grid>
        <Grid item md={6} sx={{ width: "100%", position: "relative" }}>
          {!output ? null : (
            <ClipboardCopy onCopy={handleCopy} text={clipboardText} />
          )}
          {!loading ? null : <SkeletonLoader />}
          {isFailed && code.length ? <Failed /> : null}
          <Editor
            mode="tsx"
            code={prettyOutput!}
            name="svg-editor-2"
            isReadOnly
          />
          <Notice
            visible={!!output && framework === "react-native"}
            title="To use SVG in React Native, install the 'react-native-svg' package"
          />
        </Grid>
      </Grid>
      <Toast
        open={toast.open}
        message={toast.message}
        handleClose={handleClose}
        severity={toast.severity}
      />
    </Layout>
  );
};

export default Index;
